import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Menu } from '../assets/svg/menu_black_24dp.svg'


export function AppHeader() {
    const [isMobile, setIsMobile] = useState(false)
    const changeMobile = () => {
        setIsMobile(prev => prev = !prev)
    }

    return (
        <header className="app-header">
            <nav className="main-nav ">
                {!isMobile && <div className="left-nav">
                    <Link to='/about'><span>About</span></Link>
                </div>}
                {isMobile && <div onClick={changeMobile} className="mobile-nav">
                    <Link to='/car'><span>Car</span></Link>
                    <Link to='/about'><span>About</span></Link>
                </div>}
                {isMobile && <div className="background-menu" onClick={changeMobile}></div>}
                <Menu onClick={changeMobile} className="menu-btn" />
                <div className="right-nav">
                    <Link to='/'> <img src="imgs/logo.png" alt="" /></Link>
                </div>
            </nav>
        </header>
    )
}
