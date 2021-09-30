import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {

    return (
        <section className="home-container flex ">
        <Link to="/create_survey" >
            <div className="new-survey">סקר חדש</div>
        </Link>

        <Link to="/choose_survey" >
        <div className="existing-survey">בחר סקר</div>
        </Link>
    </section>

    )
}