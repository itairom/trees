import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';
import { onGoogleLogin, onSignup, } from '../actions/appActions'
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';


export function Signup() {

    const [pageMode, setPageMode] = useState(null)
    const { loggedInUser } = useSelector(state => state.appModule)
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const userInfo = {
        fullname: '',
        username: '',
        password: '',
        imgUrl: ''
    }
    const validate = Yup.object({
        username: Yup.string()
            .min(4, 'Must be 4 or more')
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
        password: Yup.string()
            .min(6, 'Must be 6 or more')
            .max(20, 'Must be 20 characters or less')
            .required('Required')
    })


    useEffect(() => {
        if (loggedInUser) history.push('/')
        const pageMode = location.pathname === '/login' ? 'login' : 'signup'
        setPageMode(pageMode)
    }, [])

    // const onSuccessGoogle = (res) => {
    //     const { tokenId } = res
    //     // const { onGoogleLogin } = this.props
    //     onGoogleLogin(tokenId)
    // }

    // const onFailureGoogle = (res) => {
    //     console.log('Login with google failed', res)
    // }

    const onSubmit = (values) => {
        dispatch(onSignup(values))
        history.push('/')
    }


    if (!pageMode) return ''
    return (
        <section className="login-signup-container">
            <div className="login-signup ">
                <Formik

                    initialValues={userInfo}
                    validationSchema={validate}
                    onSubmit={(values) => {
                        onSubmit(values)
                    }} >
                    <Form className="flex column">
                        <div className="flex">
                            <Field type="fullname" placeholder="Enter fullname" name="fullname" autoFocus />
                            <ErrorMessage name="fullname" component="p" />
                        </div>
                        <div className="flex">
                            <Field type="username" placeholder="Enter username" name="username" autoFocus />
                            <ErrorMessage name="username" component="p" />
                        </div>
                        <div className="flex">
                            <Field type="password" placeholder="Enter password" name="password" />
                            <ErrorMessage name="password" component="p" />
                        </div>

                        <button type="submit" className="primary-btn login-signup-btn">Signup</button>
                    </Form>
                </Formik>
                <hr />
                <Link to="/login">Already have an account ? Log In</Link>
            </div>
        </section>
    )

}

