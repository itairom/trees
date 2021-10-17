import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Menu } from '../assets/svg/menu_black_24dp.svg'
import { storageService } from '../services/storageService'


export function AppHeader() {
    const [isMobile, setIsMobile] = useState(false)
    const [localSurveyId, setLocalSurveyId] = useState('')

    useEffect(() => {
        let storageId = storageService.loadFromStorage('surveyId')
        if(storageId){
            setLocalSurveyId(storageId.surveyTitle)
        }
    }, [])

    const changeMobile = () => {
        setIsMobile(prev => prev = !prev)
    }



    return (
        <header className="app-header">
            <nav className="main-nav ">
                {!isMobile && <div className="left-nav">
                    <Link to='/trees'><span>סקר עצים סופי</span></Link>
                    <Link to='/'><span>טופס סקר עצים</span></Link>
                    <a className="current-survey"><span>סקר </span>{localSurveyId}</a>
                </div>}
                {isMobile && <div onClick={changeMobile} className="mobile-nav">
                    <p>סקר <span>{localSurveyId}</span></p>
                    <Link to='/trees'><span>סקר עצים סופי</span></Link>
                    <Link to='/'><span>טופס סקר עצים</span></Link>
                </div>}
                {isMobile && <div className="background-menu" onClick={changeMobile}></div>}
                <Menu onClick={changeMobile} className="menu-btn" />
                <div className="right-nav">
                </div>
            </nav>
        </header>
    )
}
