import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { TreesImages } from '../cmps/TreesImages';
import { TreesTable } from '../cmps/TreesTable';
import { treeService } from '../services/treeService';
import {  MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { setCurrentSurvey } from '../actions/TreeActions';



export const ChooseSurvey = () => {

    let dispatch =useDispatch()
    let [trees, setTrees] = useState([])
    let [tableIdList, setTableIdList] = useState([''])
    let [currentSurveyId, setCurrentSurveyId] = useState('kfar saba')

    useEffect(() => {
        async function queryTrees() {
            setTableIdList(await treeService.querySurveyIdList())
            setTrees(await treeService.query(currentSurveyId))
        }
        queryTrees()
    }, [])
    
    useEffect(() => {

        dispatch(setCurrentSurvey(currentSurveyId))

        // async function queryTrees() {
        // console.log('currentTableId',currentTableId);
        // setTrees(await treeService.query(currentTableId))
        // }
        // queryTrees()
    }, [currentSurveyId])



    return (
        <section className="choose-section">

            <div className=""></div>
            <h1>בחר סקר</h1>
            <FormControl>
                    {/* <InputLabel required id="movingPossibility"></InputLabel> */}
                    <Select
                        required
                        type="text"
                        id="currentTableId"
                        name="currentTableId"
                        variant="filled"
                        color="primary"
                        value={currentSurveyId}
                        onChange={(ev) => { setCurrentSurveyId(ev.target.value) }}
                        >
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
        </section>
    )
}