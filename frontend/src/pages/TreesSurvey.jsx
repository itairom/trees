import React, { useEffect, useState } from 'react'
import html2pdf from 'html2pdf.js'
import { TreesImages } from '../cmps/TreesImages';
import { TreesTable } from '../cmps/TreesTable';
import { treeService } from '../services/treeService';
import { useSelector } from 'react-redux';
import { storageService } from '../services/storageService';
import { TreesTypesTable } from '../cmps/TreesTypesTable';
import TreeMap from '../cmps/TreeMap';
import { TreeRecommendationTable } from '../cmps/table/TreeRecommendationTable';

export const TreesSurvey = () => {

    const { currentSurvey } = useSelector(state => state.TreeModule)

    let [trees, setTrees] = useState([])
    // let [currentTableId, setCurrentTableId] = useState('')
    let [tableIdList, setTableIdList] = useState([''])
    const [localSurveyId, setLocalSurveyId] = useState('')

    useEffect(() => {

        async function queryTrees() {
            setTableIdList(await treeService.querySurveyIdList())
            setTrees(await treeService.queryTrees(currentSurvey?.surveyTitle))
            if (Object.keys(currentSurvey).length === 0) {
                let storageId = await storageService.loadFromStorage('surveyId')
                if (storageId) {
                    setTrees(await treeService.queryTrees(storageId?.surveyTitle))
                    setLocalSurveyId(storageId)
                }
            }
        }
        queryTrees()
    }, [])

    useEffect(() => {
        async function queryTrees() {
            if (Object.keys(currentSurvey).length === 0) {
                setTrees(await treeService.queryTrees(localSurveyId?.surveyTitle))
            }
        }
        queryTrees()
    }, [localSurveyId])


    // const downloadAsPdf = () => {
    //     let el = document.querySelector('#main-survey')
    //     html2pdf(el);
    // }

    return (
        <section id="main-survey" className="main-container trees-survey flex">
            <h1>טבלה סקר <span>{currentSurvey?.surveyTitle || localSurveyId?.surveyTitle}</span></h1>

            <TreesTable trees={trees} />
            <TreesImages trees={trees} />
            <TreesTypesTable trees={trees} />
            <TreeRecommendationTable trees={trees} />
            {/* <TreeMap text="mapmap" /> */}
        </section>
    )
}