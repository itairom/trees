
import React, { useEffect, useState } from 'react'
import { TreesImages } from '../cmps/TreesImages';
import { treeService } from '../services/treeService';
import { useSelector } from 'react-redux';
import { storageService } from '../services/storageService';
import { MemoTreesTypesTable } from '../cmps/table/TreesTypesTable';
import { TreesTable } from '../cmps/table/TreesTable';
import { TreeRecommendationTable } from '../cmps/table/TreeRecommendationTable';
import { useDispatch } from 'react-redux';
import { querySurvey } from '../actions/TreeActions';
// const TreesTypesTable = lazy(() => import('../cmps/TreesTypesTable'))

export const FinalSurvey = () => {

    const { currentSurvey, survey } = useSelector(state => state.TreeModule)
    const { loggedInUser } = useSelector(state => state.appModule)
    let [localSurvey, setLocalSurvey] = useState({})
    // let [tableIdList, setTableIdList] = useState([''])
    const [localSurveyId, setLocalSurveyId] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        query()
    }, [loggedInUser])
    
    useEffect(() => {
        setLocalSurvey(survey)
    }, [survey])

    const query = async () => {
        const storageSurveyId = storageService.loadFromStorage('surveyId')
        if (storageSurveyId) {
            dispatch(querySurvey(storageSurveyId.surveyTitle, loggedInUser.username))
        }
    }

    // useEffect(() => { //CHECK IF NECCECERY
    //     async function queryTrees() {
    //         if (currentSurvey) {
    //             setTrees(await treeService.queryTrees(localSurveyId?.surveyTitle))
    //         }
    //     }
    //     queryTrees()
    // }, [localSurveyId])

    // useEffect(() => {
    //     queryTrees()
    // }, [currentSurvey, loggedInUser])

    const onRemoveTree = (tree) => {
        treeService.removeTree(tree._id, loggedInUser.username)
        // queryTrees()
    }

    return (
        <section id="main-survey" className="main-container  ">
            <div className="final-survey">
                {/* <h1>טבלה סקר <span>{currentSurvey?.surveyTitle || localSurveyId?.surveyTitle}</span></h1> */}
                <TreesTable onRemoveTree={onRemoveTree} trees={localSurvey.surveyTrees} />
                <h1>תמונות</h1>
                <TreesImages trees={localSurvey.surveyTrees} />
                <h1>טבלת ריכוז עפ"י מיני העצים </h1>
                <MemoTreesTypesTable trees={localSurvey.surveyTrees} />
                <h1>טבלת סיכום המלצות</h1>
                <TreeRecommendationTable trees={localSurvey.surveyTrees} />
            </div>
        </section>
    )
}

export default function LazyFinalSurvey() {
    return <FinalSurvey />
}