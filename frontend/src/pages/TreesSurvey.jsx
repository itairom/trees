import React, { useEffect, useState } from 'react'
import { TreesImages } from '../cmps/TreesImages';
import { TreesTable } from '../cmps/TreesTable';
import { treeService } from '../services/treeService';
import { useSelector } from 'react-redux';
import { storageService } from '../services/storageService';
import { TreesTypesTable } from '../cmps/TreesTypesTable';




export const TreesSurvey = () => {

    const { currentSurvey } = useSelector(state => state.TreeModule)

    let [trees, setTrees] = useState([])
    // let [currentTableId, setCurrentTableId] = useState('')
    let [tableIdList, setTableIdList] = useState([''])


    useEffect(() => {

        async function queryTrees() {

            setTableIdList(await treeService.querySurveyIdList())
            setTrees(await treeService.queryTrees(currentSurvey.surveyTitle))

            if (Object.keys(currentSurvey).length === 0) {
                let storageId = storageService.loadFromStorage('surveyId')
                setTrees(await treeService.queryTrees(storageId.surveyTitle))
            }
        }
        queryTrees()
    }, [])


    return (

        <section className="main-container trees-survey flex">
            <h1><span>{currentSurvey?.surveyTitle}</span> טבלה סקר</h1>
            <TreesTable trees={trees} />
            <TreesImages trees={trees} />
            <TreesTypesTable trees={trees} />
        </section>


    )

}