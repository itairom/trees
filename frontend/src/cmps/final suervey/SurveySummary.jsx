import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSurvey } from "../../actions/TreeActions"




export const SurveySummary = ({ summary }) => {

    const [localSummary, setLocalSummary] = useState(summary)
    const [isEdit, setIsEdit] = useState(false)
    const { loggedInUser } = useSelector(state => state.appModule)
    const { survey } = useSelector(state => state.TreeModule)
    const dispatch = useDispatch()


    useEffect(() => {
        setLocalSummary(summary)
    }, [summary])

    useEffect(() => {

    }, [isEdit])


    const onUpdateSurvey = () => {
        const survyCopy = { ...survey }
        survyCopy.surveyInfo.surveySummary = localSummary
        dispatch(updateSurvey(survyCopy, loggedInUser))
    }

    const handleChange = ev => {
        setLocalSummary(ev.target.value)
    }

    if (!summary) return <h1>load summary</h1>
    return (
        <div className="summary-container" >
            {isEdit && <textarea
                name="summary"
                value={localSummary}
                onChange={(e) => { handleChange(e) }}>
            </textarea>}
            {isEdit && <div
                className="btn"
                onClick={() => {
                    onUpdateSurvey()
                    setIsEdit(false)
                }} >
                עדכן</div>}
            {!isEdit && <div
                onClick={() => { 
                    setIsEdit(true)
                }}
            >
                {localSummary}
            </div>}
        </div>
    )
}