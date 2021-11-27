import React, { useCallback, useState } from 'react'
import { useFormCreateSurvey } from '../services/customHooks'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentSurvey } from '../actions/TreeActions'
import { storageService } from '../services/storageService';
import { updateSurvey } from '../actions/TreeActions';


export function CreateSurvey() {


    const history = useHistory();
    // const handleOnClick = useCallback(() => history.push('/survey_editor'), [history]);
    const dispatch = useDispatch()
    const { currentSurvey } = useSelector(state => state.TreeModule)
    const { loggedInUser } = useSelector(state => state.appModule)

    const [survey, setSurvey] = useState({
        surveyInfo: {
            surveyTitle: '',
            surveyDate: '',
            surveySummary: '',
            companyLogo: '',
            clientInfo: {
                clientName: '',
                clientEmail: '',
                clientPhone: '',
                clientAdress: ''
            }
        },
        surveyTrees: [],
        surveyOwner: {}
    })

    const handleChange = ev => {
        const { name } = ev.target
        let value = (ev.target.type === 'number') ? +ev.target.value : ev.target.value
        value = (ev.target.type === 'checkbox') ? ev.target.checked : value
        setSurvey(
            prevState => ({
                ...prevState, surveyInfo: {
                    ...prevState.surveyInfo, [name]: value
                }
            })
        )
    }

    const onCreateSurvey = () => {
        dispatch(updateSurvey(survey, loggedInUser))
        // storageService.saveToStorage('survey',survey)
        storageService.saveToStorage('surveyId', survey.surveyInfo)
        history.push('./')
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
                {/* <div className="add-btn button" onClick={() => { console.log('SURVEY', survey); }}>הוסף סקר</div> */}
                <div className="add-btn button" onClick={() => { onCreateSurvey() }}>הוסף סקר</div>

                <Link to="/choose_survey" >
                    <div className="existing-survey">חזרה</div>
                </Link>

            </form>
        </section>

    )
}