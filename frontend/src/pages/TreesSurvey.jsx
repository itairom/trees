import React, { useEffect, useState } from 'react'
import { TreesImages } from '../cmps/TreesImages';
import { TreesTable } from '../cmps/TreesTable';
import { treeService } from '../services/treeService';
import {  MenuItem, Select, FormControl, Paper, InputLabel } from '@material-ui/core';



export const TreesSurvey = () => {

    let [trees, setTrees] = useState([])
    let [currentTableId, setCurrentTableId] = useState('kfar saba')
    let [tableIdList, setTableIdList] = useState([''])



    useEffect(() => {

        async function queryTrees() {
            setTableIdList(await treeService.queryTableIdList())
            setTrees(await treeService.query(currentTableId))
        }
        queryTrees()
    }, [])
    
    useEffect(() => {
        async function queryTrees() {
        console.log('currentTableId',currentTableId);
        setTrees(await treeService.query(currentTableId))
        }
        queryTrees()
    }, [currentTableId])

    return (

        <section className="main-container trees-survey flex">
            <div className="select-table">
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
            </div>
            <TreesTable trees={trees} />
            <TreesImages trees={trees} />
        </section>


    )

}