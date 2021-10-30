import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReactComponent as Menu } from '../assets/svg/menu_black_24dp.svg'
import { storageService } from '../services/storageService'
import { UserInfo } from './UserInfo'


export function AppHeader() {
    const [isMobile, setIsMobile] = useState(false)
    // const [isShowUserInfo, setIsShowUserInfo] = useState(false)
    const [localSurveyId, setLocalSurveyId] = useState(null)
    const { currentSurvey } = useSelector(state => state.TreeModule)
    const { loggedInUser } = useSelector(state => state.appModule)
    const headerRef = useRef()

    useEffect(() => {
        // window.addEventListener('scroll', handleScroll)
        let storageId = storageService.loadFromStorage('surveyId')
        if (storageId) {
            console.log("🚀 ~ file: AppHeader.jsx ~ line 20 ~ useEffect ~ storageId", storageId)
            setLocalSurveyId(storageId)
        }

        return () => {
            // window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    useEffect(() => {
        if (currentSurvey) {
            console.log(currentSurvey);
            setLocalSurveyId(currentSurvey)
        }
    }, [currentSurvey])


    useEffect(() => {
        console.log('localSurveyId', localSurveyId);
    }, [localSurveyId])

    const handleScroll = () => {
        if (window.pageYOffset > 40) {
            headerRef.current.className = 'main-nav fixed'
        } else {
            headerRef.current.className = 'main-nav'
        }
    }

    const changeMobile = () => {
        setIsMobile(prev => prev = !prev)
    }

    return (
        <header className="app-header">
            <nav ref={headerRef} className="main-nav">
                {loggedInUser && !isMobile && <div className="left-nav ">
                    <p className="current-survey"><span>סקר</span> {localSurveyId?.surveyTitle}</p>
                    <Link to='/trees'><span>סקר סופי</span></Link>
                    <Link to='/'><span>בחר סקר</span></Link>
                    {localSurveyId && <Link to='/survey_editor'><span>הוספת עץ</span></Link>}
                </div>}
                {isMobile && <div onClick={changeMobile} className="mobile-nav">
                    <p>סקר <span>{localSurveyId?.surveyTitle}</span></p>
                    <Link to='/trees'><span>סקר סופי</span></Link>
                    <Link to='/'><span>בחר סקר</span></Link>
                    {localSurveyId && <Link to='/survey_editor'><span>הוספת עץ</span></Link>}
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
