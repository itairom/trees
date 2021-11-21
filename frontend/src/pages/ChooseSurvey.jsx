import { useHistory } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import { treeService } from '../services/treeService';
import { MenuItem, Select, FormControl, InputLabel } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSurvey } from '../actions/TreeActions';
import { storageService } from '../services/storageService';
import { CreateSurvey } from '../pages/CreateSurvey';



export const ChooseSurvey = () => {

    let [surveyIdList, setSurveyIdList] = useState([])
    let [currentSurveyId, setCurrentSurveyId] = useState({})
    const history = useHistory();
    const handleOnClickNext = useCallback(() => history.push('/survey_editor'), [history]);
    const handleOnClickBack = useCallback(() => history.push('/'), [history]);
    const handleOnClickCreate = useCallback(() => history.push('/create_survey'), [history]);
    // const { currentSurvey } = useSelector(state => state.TreeModule)
    const { loggedInUser, loginErr } = useSelector(state => state.appModule)
    let dispatch = useDispatch()


    useEffect(() => {
        (async () => {
            if (loggedInUser) {
                const resp = await treeService.querySurveyIdList(loggedInUser)
                setSurveyIdList(resp)
            }
        })()
    }, [])

    useEffect(() => {
        storageService.saveToStorage('surveyId',currentSurveyId)
            dispatch(setCurrentSurvey(currentSurveyId))
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
                            surveyIdList?.map((survey) => (
                                <MenuItem
                                    key={survey.surveyTitle}
                                    value={survey}>
                                    {survey.surveyTitle}
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
            {(surveyIdList.length === 0) && <>
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