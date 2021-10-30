import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { onLogout } from "../actions/appActions";
import { storageService } from "../services/storageService";


export function UserInfo() {

    const [isShowUserInfo, setIsShowUserInfo] = useState(false)

    const { loggedInUser, loginErr } = useSelector(state => state.appModule)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('loginErr', loginErr);
    }, [loginErr])

    const logout = () => {
        storageService.saveToStorage('surveyId', null) // Reset current survey
        dispatch(onLogout(loggedInUser))
    }

    return (
        <div onClick={() => { setIsShowUserInfo(!isShowUserInfo) }} className="login-profile">
            {isShowUserInfo &&
                <div className="user-dropdown">
                    <div className="dropdown-list">
                        <p>{loggedInUser?.username}</p>
                        {(loggedInUser) &&
                            <div className="">
                                {/* <Link to='/profile' >
                                    <span>Profile</span>
                                </Link> */}
                            </div>
                        }
                        {(loggedInUser) &&
                            <a href="" onClick={() => logout()}>Logout</a>
                        }
                        {(!loggedInUser) && <Link to='/login' >
                            <span>Login</span>
                        </Link>}
                    </div>
                </div>}
            <img className="profile-icon" src="./imgs/header/user.svg" alt="icon" />
        </div>
        // <div className="user-info flex column grey">
        //     <p>{loggedInUser?.username}</p>
        //     {!loggedInUser && <NavLink to="/login">התחבר</NavLink>}
        //     {loggedInUser && <button onClick={() => { logout() }}>Logout</button>}
        // </div>
    )
}
