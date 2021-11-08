
import React, {  useEffect, useState } from 'react'
import { TreesImages } from '../cmps/TreesImages';
import { TreesTable } from '../cmps/TreesTable';
import { treeService } from '../services/treeService';
import { useSelector } from 'react-redux';
import { storageService } from '../services/storageService';
import { TreesTypesTable } from '../cmps/TreesTypesTable';
import { TreeRecommendationTable } from '../cmps/table/TreeRecommendationTable';
// const TreesTypesTable = lazy(() => import('../cmps/TreesTypesTable'))

export const TreesSurvey = () => {
    
    const { currentSurvey } = useSelector(state => state.TreeModule)
    const { loggedInUser } = useSelector(state => state.appModule)
    let [trees, setTrees] = useState([])
    let [tableIdList, setTableIdList] = useState([''])
    const [localSurveyId, setLocalSurveyId] = useState('')
    
    useEffect(() => {
        
        async function queryTrees() {
            console.log(loggedInUser,'loggedInUser');
            setTableIdList(await treeService.querySurveyIdList(loggedInUser))
            setTrees(await treeService.queryTrees(currentSurvey?.surveyTitle,loggedInUser?.username))
            if (!currentSurvey) {
                let storageId = await storageService.loadFromStorage('surveyId')
                let loggedinUser = await storageService.loadFromStorage('loggedinUser')
                if (storageId) {
                    setTrees(await treeService.queryTrees(storageId.surveyTitle,loggedinUser.username))
                    setLocalSurveyId(storageId)
                }
            }
        }
        queryTrees()
    }, [])
    
    useEffect(() => {
        async function queryTrees() {
            if (currentSurvey){
                setTrees(await treeService.queryTrees(localSurveyId?.surveyTitle))
            }
        }
        queryTrees()
    }, [localSurveyId])
    
    useEffect(() => {
        
    },[currentSurvey,loggedInUser])

useEffect(()=>{
    console.log('trees',trees);
},[trees])

    return (
        <section id="main-survey" className="main-container   flex">
            <h1>טבלה סקר <span>{currentSurvey?.surveyTitle || localSurveyId?.surveyTitle}</span></h1>
            <TreesTable trees={trees} />
            <TreesImages trees={trees} />
            {/* <Suspense fallback={<h1>Loading</h1>} > */}
                <TreesTypesTable trees={trees} />
            {/* </Suspense> */}
            <TreeRecommendationTable trees={trees} />
            {/* <TreeMap text="mapmap" /> */}
        </section>
    )
}