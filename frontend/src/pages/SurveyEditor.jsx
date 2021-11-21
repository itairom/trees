import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TreesForm } from '../cmps/TreesForm'
import { treeService } from '../services/treeService'
import { storageService } from '../services/storageService';
import { querySurvey } from '../actions/TreeActions';

// import { TreePreviewList } from '../cmps/TreePreviewList';
// const TreePreviewList = lazy(() => import('../cmps/TreePreviewList'))
const TreePreviewList = lazy(() => import('../services/exportModule'))

const SurveyEditor = () => {

    const { currentSurvey, survey } = useSelector(state => state.TreeModule)
    const { loggedInUser } = useSelector(state => state.appModule)
    const [isAddingTree, setIsAddingTree] = useState(true)
    // const [currentSurveyTrees, setCurrentSurveyTrees] = useState([])
    // const [currentPreviewTree, setCurrentPreviewTree] = useState(false)
    const [localCurrentSurvey, setLocalCurrentSurvey] = useState(null)
    const dispatch = useDispatch()


    useEffect(() => { // querySurveyTreessss

        // querySurveyTrees()
        query()

    }, [])

    useEffect(() => { // querySurveyTreessss
        console.log("🚀 ~ file: SurveyEditor.jsx ~ line 34 ~ SurveyEditor ~ survey", survey)
        setLocalCurrentSurvey(survey)
    }, [survey])

    const query = async () => {
        // const survey = await treeService.querySurvey(currentSurvey?.surveyTitle, loggedInUser?.username)
        // dispatch(querySurvey(currentSurvey?.surveyTitle, loggedInUser?.username))
        // setLocalCurrentSurvey(survey)
        // if (!currentSurvey) {
        const storageSurveyId = storageService.loadFromStorage('surveyId')
        if (storageSurveyId) {
            // const survey = await treeService.querySurvey(storageSurveyId.surveyTitle, loggedInUser?.username)
            dispatch(querySurvey(storageSurveyId.surveyTitle, loggedInUser.username))
            // dispatch(querySurvey(currentSurvey?.surveyTitle, loggedInUser?.username))
            // setLocalCurrentSurvey(survey)
        }
        // }
    }
    // const querySurveyTrees = async () => {
    //     let trees = await treeService.querySurveyTrees(currentSurvey?.surveyTitle, loggedInUser?.username)
    //     setCurrentSurveyTrees(trees)
    //     setLocalCurrentSurvey(currentSurvey)
    //     if (!currentSurvey) {
    //         const storageTreeId = storageService.loadFromStorage('surveyId')
    //         if (storageTreeId) {
    //             let trees = await treeService.querySurveyTrees(storageTreeId.surveyTitle, loggedInUser?.username)
    //             setLocalCurrentSurvey(storageTreeId)
    //             setCurrentSurveyTrees(trees)
    //         }
    //     }
    // }

    return (
        <section id="swup" className="main-container rtl">
            <h1>טופס סקר עצים <span>{localCurrentSurvey?.surveyTitle}</span>  </h1>
            <div className="add-tree">
                {isAddingTree && <TreesForm querySurvey={query} />}
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <TreePreviewList currentSurveyTrees={survey.surveyTrees} querySurveyTrees={querySurvey} />
            </Suspense>
        </section>
    )
}

export default function LazySurveyEditor() {
    return <SurveyEditor />
}