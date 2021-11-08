import { useHistory } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import { treeService } from '../services/treeService';
import { MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSurvey } from '../actions/TreeActions';
import { storageService } from '../services/storageService';
import { CreateSurvey } from '../pages/CreateSurvey';



export const ChooseSurvey = () => {

    let dispatch = useDispatch()
    const history = useHistory();
    let [surveyIdList, setSurveyIdList] = useState([])
    let [currentSurveyId, setCurrentSurveyId] = useState({})
    const handleOnClickNext = useCallback(() => history.push('/survey_editor'), [history]);
    const handleOnClickBack = useCallback(() => history.push('/'), [history]);
    const handleOnClickCreate = useCallback(() => history.push('/create_survey'), [history]);
    const { currentSurvey } = useSelector(state => state.TreeModule)
    const { loggedInUser, loginErr } = useSelector(state => state.appModule)


    useEffect(() => {
        (async () => {
            if (loggedInUser) {
                const resp = await treeService.querySurveyIdList(loggedInUser)
                console.log("🚀 ~ file: ChooseSurvey.jsx ~ line 29 ~ resp", resp)
                setSurveyIdList(resp)
            }
        })()
    }, [])

    useEffect(() => {
        let filterdList = surveyIdList.filter(tree => { return tree.surveyTitle === currentSurveyId })
        if (filterdList.length) {
            console.log("🚀 ~ file: ChooseSurvey.jsx ~ line 46 ~ useEffect ~ filterdList", filterdList)
            storageService.saveToStorage('surveyId', filterdList[0])
            dispatch(setCurrentSurvey(filterdList[0]))
        }
    }, [currentSurveyId])




    return (
        <section className="choose-section flex">
            {(surveyIdList.length !== 0) && <>
                <h1>בחר סקר</h1>
                <FormControl>
                    <InputLabel required id="movingPossibility">בחר</InputLabel>
                    <Select
                        required
                        type="text"
                        id="currentTableId"
                        name="currentTableId"
                        variant="filled"
                        color="primary"
                        value={currentSurveyId}
                        label="לחץ כאן"
                        placeholder="לחץ כאן"
                        onChange={(ev) => { setCurrentSurveyId(ev.target.value) }} >
                        {
                            surveyIdList?.map((id) => (
                                <MenuItem
                                    key={id.surveyTitle}
                                    value={id.surveyTitle}>
                                    {id.surveyTitle}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                <div className="next-btn button"
                    onClick={() => { handleOnClickNext() }} >
                    <p>המשך</p>
                </div>
                <div className="back-btn button"
                    onClick={() => { handleOnClickBack() }} >
                    <p>חזור</p>
                </div>
            </>}
            {(surveyIdList.length === 0)&&<> 
                <h1>הוסף סקר ראשון</h1>
                <div className="next-btn button"
                    onClick={() => { handleOnClickCreate() }} >
                        <p>הוסף סקר</p>
                </div>
                <CreateSurvey />
            </>}
        </section>
    )
}