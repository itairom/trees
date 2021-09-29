import React from 'react'
import { Link } from 'react-router-dom'

export const ChooseSurvey = () => {

    return (
        // <section className="main-container flex ">
        <section className="choose-survey flex ">
            <Link to="/create_survey" >
                <div className="new-survey">סקר חדש</div>
            </Link>

            <Link to="/create_survey" >
            <div className="existing-survey">בחר סקר</div>
            </Link>
        </section>

    )
}