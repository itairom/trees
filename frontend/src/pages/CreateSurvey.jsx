import React, { useCallback } from 'react'
import { useForm } from '../services/customHooks'
import { Link,useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSurvey } from '../actions/CarActions'

export const CreateSurvey = () => {

    
    const history = useHistory();
    const handleOnClick = useCallback(() => history.push('/survey_editor'), [history]);
    const dispatch = useDispatch()
    const { currentSurvey } = useSelector(state => state.carModule)

    const [survey, handleChange] = useForm({
        surveyTitle: '',
        surveyDate: '',
        surveySummary: ''
    })

    const addNewSurvey = async () => {
        await dispatch(setCurrentSurvey(survey))
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
                        onChange={(ev) => { handleChange(ev) }}
                        value={survey.surveyDate} />
                </label>
                <div className="add-btn" onClick={() => { addNewSurvey() }}>הוסף סקר</div>

                <Link to="/choose_survey" >
                    <div className="existing-survey">חזרה</div>
                </Link>

            </form>
        </section>

    )
}