import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
// import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux';
import { onLogin } from '../actions/appActions'
import * as Yup from 'yup';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { storageService } from '../services/storageService';


export function Login() {

  const { loggedInUser, loginErr } = useSelector(state => state.appModule)
  const [pageMode, setPageMode] = useState(null)
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const credentials = {
    username: '',
    password: ''
  }


  useEffect(() => {
    if (loggedInUser) history.push('/')
    const pageMode = location.pathname === '/login' ? 'login' : 'signup'
    setPageMode(pageMode)
  }, [])

  useEffect(() => {
    console.log('loginErr', loginErr);
  }, [loginErr])

  const onSubmit = (values) => {
    storageService.saveToStorage('surveyId', null) // Reset current survey
    dispatch(onLogin(values))
    history.push('/')
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

  // const onSuccessGoogle = (res) => {
  //   const { tokenId } = res
  //   // const { onGoogleLogin } = this.props
  //   onGoogleLogin(tokenId)
  // }
  // const onFailureGoogle = (res) => {
  //   console.log('Login with google failed', res)
  // }

  return (
    <section className="login-signup-container">
      <div className="login-signup ">
        <Formik
          initialValues={credentials}
          validationSchema={validate}
          onSubmit={(values) => {
            onSubmit(values)
          }} >
          <Form className="flex column">
            <ErrorMessage name="username" component="div" />
            <Field type="username" placeholder="Enter username" name="username" autoFocus />
            <ErrorMessage name="password" component="div" />
            <Field type="password" placeholder="Enter password" name="password" />
            <button type="submit" className="primary-btn login-signup-btn">Log in</button>
          </Form>
        </Formik>
        <hr />
        <Link to="/signup">Sign up for an account</Link>
      </div>
    </section>
  )

}

