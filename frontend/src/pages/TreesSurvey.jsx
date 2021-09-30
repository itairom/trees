import React, { useEffect, useState } from 'react'
import { TreesImages } from '../cmps/TreesImages';
import { TreesTable } from '../cmps/TreesTable';
import { treeService } from '../services/treeService';
import { MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { storageService } from '../services/storageService';




export const TreesSurvey = () => {

    const { currentSurvey, isTreePreviewShowen } = useSelector(state => state.TreeModule)

    let [trees, setTrees] = useState([])
    let [currentTableId, setCurrentTableId] = useState('')
    let [tableIdList, setTableIdList] = useState([''])


    useEffect(() => {

        console.log('currentSurvey table', currentSurvey);
        
        
        async function queryTrees() {
                
            setTableIdList(await treeService.querySurveyIdList())
            setTrees(await treeService.queryTrees(currentSurvey.surveyTitle))

            if (Object.keys(currentSurvey).length === 0) {
                let storageId= storageService.loadFromStorage('surveyId')
                console.log("🚀 ~ file: TreesSurvey.jsx ~ line 26 ~ useEffect ~ storageId", storageId)
                setTrees(await treeService.queryTrees(storageId.surveyTitle))
            }
        }
        queryTrees()
    }, [])


    return (

        <section className="main-container trees-survey flex">
            <h1><span>{currentSurvey.surveyTitle}</span> טבלה סקר</h1>
            {/* <div className="select-table">
                <p>בחר טבלה: </p>
                <FormControl>
                    <InputLabel required id="movingPossibility">בחר טבלה: </InputLabel>
                    <Select
                        required
                        type="text"
                        id="currentTableId"
                        name="currentTableId"
                        variant="filled"
                        color="primary"
                        value={currentTableId}
                        onChange={(ev) => { setCurrentTableId(ev.target.value) }}>
                        {
                            tableIdList.map((id) => (
                                <MenuItem
                                    key={id}
                                    value={id}>
                                    {id}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </div> */}
            <TreesTable  trees={trees} />
            <TreesImages   trees={trees} />
        </section>


    )

}