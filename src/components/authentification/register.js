import React, { useState } from 'react'
import {Formik, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { useDispatch} from 'react-redux'
import { tryCreateUserAction } from '../store/users/users.actions'
import { useHistory } from 'react-router-dom'

const SignUpSchema = Yup.object().shape({
    firstname: Yup.string().required('first name obligatoire'),
    lastname: Yup.string().required('last name obligatoire'),
    email: Yup.string().email().required('email obligatoire'),
    password: Yup.string().required('password obligatoire').min(6, 'password is short'),
    password_repeat: Yup.string().oneOf([Yup.ref('password'), null], 'passwords must match')
})

const Register = ({setUserLoggedIn, users}) => {
    const initialValues = {firstname:'', lastname:'', email:'', password:'', password_repeat:''};

    const dispatch = useDispatch();
    const history = useHistory();
    const [error, setError] = useState()

    const submit = (values, actions) => {

        delete values.password_repeat;
        const userExist = users.find(u => u && u.email === values.email)

        if(userExist){
            setError('! This email address is already in use, try a new email')

        }else{
            try {
                dispatch(tryCreateUserAction(values))
                setUserLoggedIn(values)
                history.push('/mailbox/:inbox')
    
            } catch (error) {
                console.log(error)
            }
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
            validationSchema={SignUpSchema}
        >
        { ({handleSubmit, handleBlur, handleChange, values, isSubmitting, errors, touched}) => (
            <form onSubmit={handleSubmit} className="card form-group w-50 mx-auto shadow mb-5 bg-white rounded">
                <h5 className="card-header text-center">Register</h5>
                <div className="card-body">
                    <div className='d-flex mt-2'>
                        <Field name='firstname' onBlur={handleBlur} onChange={handleChange} type='text' placeholder='First name' className='form-control mr-1'/>
                        <Field name='lastname' onBlur={handleBlur} onChange={handleChange} type='text' placeholder='Last name' className='form-control ml-1'/>
                    </div>
                    <Field name='email' onBlur={handleBlur} onChange={handleChange} type='email' placeholder='Email' className='form-control'/>
                    <Field name='password' onBlur={handleBlur} onChange={handleChange} type='password' placeholder='Password' className='form-control'/>
                    <Field name='password_repeat' onBlur={handleBlur} onChange={handleChange} type='password' placeholder='Password repeat' className='form-control'/>
                    <button type='submit' className='btn btn-dark w-100' disabled={isSubmitting}>Submit</button>
                    <div className='container list-error d-flex flex-column text-red'>
                        {/* { Object.entries(errors).map(([key, value]) => <span>{key}--{value}* <ErrorMessage name={key} /></span>) } */}
                        <ErrorMessage name='firstname' component={ErrorMsg}/>
                        <ErrorMessage name='lastname' component={ErrorMsg}/>
                        <ErrorMessage name='email' component={ErrorMsg}/>
                        <ErrorMessage name='password' component={ErrorMsg}/>
                        <ErrorMessage name='password_repeat' component={ErrorMsg}/>
                    </div>
                </div>
            </form>
        ) }
        </Formik>
        </div>
        </>
    )
}   

export default Register;