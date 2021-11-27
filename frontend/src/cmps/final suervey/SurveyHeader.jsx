import React, { useEffect, useState } from "react"

export function SurveyHeader({ surveyInfo }) {

    // const [localSurveyInfo, setLocalSurveyInfo] = useState(surveyInfo)

    const [isEdit, setIsEdit] = useState({
        clientName: false,
        clientEmail: false,
        clientPhone: false,
        clientAdress: false
    })
    const [clientInfo, setClientInfo] = useState({
        clientName: 'לכבוד',
        clientEmail: 'מייל',
        clientPhone: 'טלפון',
        clientAdress: 'כתובת'
    })
    useEffect(() => {
        // console.log(isEdit);
    }, [isEdit])

    useEffect(() => {
        console.log(surveyInfo);
    }, [surveyInfo])

    const handleChange = (ev) => {
        const { name } = ev.target
        const { value } = ev.target
        console.log(ev.target.name);
        setClientInfo(prevState => ({
            ...prevState,
            [name]: value

        }))
        // setClientInfo(...clientInfo,)
    }

    return (
        <div className='flex survey-header-container'>
            <div className="survey-date">{surveyInfo?.surveyDate}</div>
            <div className="survey-logo">
                Logo
            </div>
            <div className="survey-info">
                {!isEdit.clientName && <p
                    onClick={() => {
                        setIsEdit(prevState => ({
                            ...prevState, clientName: true
                        }))
                    }}
                >{clientInfo.clientName}</p>}
                {isEdit.clientName && <div className="flex">
                    <div
                        onClick={() => {
                            setIsEdit(prevState => ({
                                ...prevState, clientName: false
                            }))
                        }}
                        className="btn">עדכון</div>
                    <input
                        type="text"
                        name="clientName"
                        value={clientInfo.clientName}
                        onChange={e => { handleChange(e) }} />
                </div>}
                <p>adress</p>
                <input type="text" name="clientAdress" value={clientInfo.clientAdress} onChange={e => { handleChange(e) }} />
                <p>phone</p>
                <input type="text" name="clientPhone" value={clientInfo.clientPhone} onChange={e => { handleChange(e) }} />
                <p>mail</p>
                <input type="text" name="clientEmail" value={clientInfo.clientEmail} onChange={e => { handleChange(e) }} />
            </div>
        </div>
    )
}