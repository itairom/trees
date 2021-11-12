import React, { useCallback } from 'react'
import { useFormCreateSurvey } from '../services/customHooks'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSurvey } from '../actions/TreeActions'
import { storageService } from '../services/storageService';


export function CreateSurvey () {


    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/survey_editor'), [history]);
    const dispatch = useDispatch()
    const { currentSurvey } = useSelector(state => state.TreeModule)

    const [survey, handleChange] = useFormCreateSurvey({
        surveyTitle: '',
        surveyDate: '',
        surveySummary: ''
    })

    const addNewSurvey = async () => {
        await dispatch(setCurrentSurvey(survey))
        storageService.saveToStorage('surveyId', survey)
        handleOnClick()
    }

    return (
        <section className="new-survey rtl">

            <form action="">
                <label htmlFor="surveyTitle" onSubmit={(ev) => { ev.preventDefault() }}>
                    כותרת סקר:
                    <input
                        id="surveyTitle"
                        name="surveyTitle"
                        type="text"
                        onChange={(ev) => { handleChange(ev) }}
                        value={survey.surveyTitle} />
                </label>
                <label htmlFor="surveyTitle">
                    תאריך סקר:
                    <input
                        id="surveyDate"
                        name="surveyDate"
                        type="date"
                        placeholder="dd-mm-yyyy"
                        min="1997-01-01"
                        max="2030-12-31"
                        onChange={(ev) => { handleChange(ev) }}
                        value={survey.surveyDate} />
                </label>
                <div className="add-btn button" onClick={() => { addNewSurvey() }}>הוסף סקר</div>

                <Link to="/choose_survey" >
                    <div className="existing-survey">חזרה</div>
                </Link>

            </form>
        </section>

    )
}