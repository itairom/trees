
import React, { useEffect, useState } from 'react'
import { TreesImages } from '../cmps/TreesImages';
import { treeService } from '../services/treeService';
import { useSelector } from 'react-redux';
import { storageService } from '../services/storageService';
import { MemoTreesTypesTable } from '../cmps/final suervey/TreesTypesTable';
import { TreesTable } from '../cmps/final suervey/TreesTable';
import { TreeRecommendationTable } from '../cmps/final suervey/TreeRecommendationTable';
import { useDispatch } from 'react-redux';
import { querySurvey } from '../actions/TreeActions';
import { SurveySummary } from '../cmps/final suervey/SurveySummary';
import { SurveyHeader } from '../cmps/final suervey/SurveyHeader';

export const FinalSurvey = () => {

    const { survey } = useSelector(state => state.TreeModule)
    const { loggedInUser } = useSelector(state => state.appModule)
    let [localSurvey, setLocalSurvey] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        query()
    }, [loggedInUser])

    useEffect(() => {
        setLocalSurvey(survey)
        console.log(survey, 'survey');
    }, [survey])

    const query = async () => {
        const storageSurveyId = storageService.loadFromStorage('surveyId')
        if (storageSurveyId) {
            dispatch(querySurvey(storageSurveyId.surveyTitle, loggedInUser.username))
        }
    }


    const onRemoveTree = (tree) => {
        treeService.removeTree(tree._id, loggedInUser.username)
    }

    return (
        <section id="main-survey" className="main-container  ">
            <div className="final-survey ">
                <SurveyHeader surveyInfo={localSurvey?.surveyInfo} />
                <h1>טבלה סקר <span>{localSurvey?.surveyInfo?.surveyTitle}</span></h1>
                <TreesTable onRemoveTree={onRemoveTree} trees={localSurvey.surveyTrees} />
                <h1>תמונות</h1>
                <TreesImages trees={localSurvey.surveyTrees} />
                <h1>טבלת ריכוז עפ"י מיני העצים </h1>
                <MemoTreesTypesTable trees={localSurvey.surveyTrees} />
                <h1>טבלת סיכום המלצות</h1>
                <TreeRecommendationTable trees={localSurvey.surveyTrees} />
                <h1>סיכום סקר</h1>
                <SurveySummary summary={localSurvey?.surveyInfo?.surveySummary} />
            </div>
        </section>
    )
}

export default function LazyFinalSurvey() {
    return <FinalSurvey />
}