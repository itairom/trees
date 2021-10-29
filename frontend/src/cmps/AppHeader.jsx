import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReactComponent as Menu } from '../assets/svg/menu_black_24dp.svg'
import { storageService } from '../services/storageService'
import { UserInfo } from './UserInfo'


export function AppHeader() {
    const [isMobile, setIsMobile] = useState(false)
    // const [isShowUserInfo, setIsShowUserInfo] = useState(false)
    const [localSurveyId, setLocalSurveyId] = useState('')
    const { loggedInUser } = useSelector(state => state.appModule)


    useEffect(() => {
        let storageId = storageService.loadFromStorage('surveyId')
        if (storageId) {
            setLocalSurveyId(storageId.surveyTitle)
        }
    }, [])

    const changeMobile = () => {
        setIsMobile(prev => prev = !prev)
    }

    useEffect(() => {
        console.log(loggedInUser, 'loggedInUser');
    }, [loggedInUser])


    return (
        <header className="app-header">
            <nav className="main-nav ">
                {!isMobile && <div className="left-nav">
                    <Link to='/trees'><span>סקר עצים סופי</span></Link>
                    <Link to='/'><span>טופס סקר עצים</span></Link>
                    <Link to='/survey_editor'><span>הוספת עץ</span></Link>
                    <a className="current-survey"><span>סקר </span>{localSurveyId}</a>
                </div>}
                {isMobile && <div onClick={changeMobile} className="mobile-nav">
                    <p>סקר <span>{localSurveyId}</span></p>
                    <Link to='/trees'><span>סקר עצים סופי</span></Link>
                    <Link to='/'><span>טופס סקר עצים</span></Link>
                    <Link to='/survey_editor'><span>הוספת עץ</span></Link>
                </div>}
                {isMobile && <div className="background-menu" onClick={changeMobile}></div>}
                <Menu onClick={changeMobile} className="menu-btn" />
                <div className="right-nav">
                    <UserInfo />
                </div>
            </nav>
        </header>
    )
}
