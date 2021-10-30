import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

export function Home() {
    const { loggedInUser, loginErr } = useSelector(state => state.appModule)
    const history = useHistory()

    useEffect(() => {
        console.log(loggedInUser);
        if (!loggedInUser) history.push('/login')
    }, [])

    return (
        <section className="home-container flex ">
            {/* <></> */}
            <Link to="/create_survey" >
                <div className="new-survey">סקר חדש</div>
            </Link>

            <Link to="/choose_survey" >
                <div className="existing-survey">בחר סקר</div>
            </Link>
        </section>

    )
}