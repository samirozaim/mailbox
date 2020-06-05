import React, { useState } from 'react'
import {Formik, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

const SignInSchema = Yup.object().shape({
    email: Yup.string().email().required('email obligatoire'),
    password: Yup.string().required('password obligatoire').min(6, 'password is short'),
})

const Login = ({users, setUserLoggedIn}) => {

    const history = useHistory();
    const [error, setError] = useState()
    const initialValues = {email:'', password:''};

    const submit = (values, actions) => {

        const userExist = users.find(u => u.email === values.email && u.password === values.password)

        if(userExist){
            setUserLoggedIn(userExist)
            history.push('/mailbox/inbox')
           
        }else{
            setError('Your email or your password is incorrect')
        }
        actions.setSubmitting(false)
    }

    const ErrorMsg = (props) => {
        return (
            <span>* {props.children}</span>
        )
    }
    return (
        <>
        {error && (
            <div className='bg-danger text-white text-center mt-1 p-2'>{error}</div>
        )}
        <div className='container d-flex align-items-center flex-fill'>
        <Formik
            initialValues={initialValues}
            onSubmit={submit}
            validationSchema={SignInSchema}
        >
        { ({handleSubmit, handleBlur, handleChange, values, isSubmitting}) => (
            <form onSubmit={handleSubmit} className="card form-group w-50 mx-auto shadow mb-5 bg-white rounded">
                <h5 className="card-header text-center">Log-in</h5>
                <div className="card-body">
                    <Field name='email' onBlur={handleBlur} onChange={handleChange} type='email' placeholder='Email' className='form-control'/>
                    <Field name='password' onBlur={handleBlur} onChange={handleChange} type='password' placeholder='Password' className='form-control'/>
                    <button type='submit' className='btn btn-dark w-100' disabled={isSubmitting}>Submit</button>
                    <div className='container list-error d-flex flex-column text-red'>
                        {/* { Object.entries(errors).map(([key, value]) => <span>{key}--{value}* <ErrorMessage name={key} /></span>) } */}
                        <span><ErrorMessage name='email' component={ErrorMsg}/></span>
                        <span><ErrorMessage name='password' component={ErrorMsg}/></span>
                    </div>
                </div>
            </form>
        ) }
        </Formik>
        </div>
        </>
    )
}

export default Login;