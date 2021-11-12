
import React, { useEffect, useState } from 'react'
import { TreesImages } from '../cmps/TreesImages';
import { TreesTable } from '../cmps/TreesTable';
import { treeService } from '../services/treeService';
import { useSelector } from 'react-redux';
import { storageService } from '../services/storageService';
import { TreesTypesTable } from '../cmps/TreesTypesTable';
import { TreeRecommendationTable } from '../cmps/table/TreeRecommendationTable';
// const TreesTypesTable = lazy(() => import('../cmps/TreesTypesTable'))

export const FinalSurvey = () => {

    const { currentSurvey } = useSelector(state => state.TreeModule)
    const { loggedInUser } = useSelector(state => state.appModule)
    let [trees, setTrees] = useState([])
    let [tableIdList, setTableIdList] = useState([''])
    const [localSurveyId, setLocalSurveyId] = useState('')

    useEffect(() => {
        queryTrees()
    }, [])


    useEffect(() => {
        async function queryTrees() {
            if (currentSurvey) {
                setTrees(await treeService.queryTrees(localSurveyId?.surveyTitle))
            }
        }
        queryTrees()
    }, [localSurveyId])

    useEffect(() => {

    }, [currentSurvey, loggedInUser])

    async function queryTrees() {
        setTableIdList(await treeService.querySurveyIdList(loggedInUser))
        setTrees(await treeService.queryTrees(currentSurvey?.surveyTitle, loggedInUser?.username))
        if (!currentSurvey) {
            let storageId = await storageService.loadFromStorage('surveyId')
            let loggedinUser = await storageService.loadFromStorage('loggedinUser')
            if (storageId) {
                setTrees(await treeService.queryTrees(storageId.surveyTitle, loggedinUser.username))
                setLocalSurveyId(storageId)
            }
        }
    }
    const onRemoveTree = (tree) => {
        treeService.removeTree(tree._id, loggedInUser.username)
        queryTrees()
    }

    return (
        <section id="main-survey" className="main-container final-survey ">
            <h1>טבלה סקר <span>{currentSurvey?.surveyTitle || localSurveyId?.surveyTitle}</span></h1>
            <TreesTable onRemoveTree={onRemoveTree} trees={trees} />
            <TreesImages trees={trees} />
            {/* <Suspense fallback={<h1>Loading</h1>} > */}
            <h1>טבלת ריכוז עפ"י מיני העצים </h1>
            <TreesTypesTable trees={trees} />
            {/* </Suspense> */}
            <h1>טבלת סיכום המלצות</h1>
            <TreeRecommendationTable trees={trees} />
            {/* {treeService.finalSurveyNote() } */}
            {/* <TreeMap text="mapmap" /> */}
        </section>
    )
}