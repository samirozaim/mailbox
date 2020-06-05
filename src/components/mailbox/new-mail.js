import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { tryCreateMailAction } from '../store/actions'
import { useHistory } from 'react-router-dom'

const MailFormSchema = Yup.object().shape({
    recipient: Yup.string().email('le destinataire doit être un email valide').required('adresse obligatoire')
})

const NewMail = ({userLoggedIn}) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const initialValues = {transmitter:userLoggedIn.email, recipient:'', object:'', message:'', date: new Date()}

    const submit = (values, actions) => {
        dispatch(tryCreateMailAction(values))
        history.goBack()
    }

    const msgShowHide = () => {
        let display = document.getElementById('card-body')
        if(display.style.display === 'none')
            display.style.display = 'block'
        else
            display.style.display = 'none'
    }

    return (
        <div style={{width:'40%'}} className="card newmail rounded-top shadow">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center" onClick={msgShowHide}> 
                <span>Nouveau message</span> 
                <div className='d-flex align-items-center'>
                    <i className="fa fa-minus mr-3"></i>
                    <i className="fa fa-times" onClick={(e) => {e.stopPropagation(); history.goBack()}}></i>
                </div>
                
            </div>
            <div id='card-body' className="card-body">
                <Formik
                    initialValues={initialValues}
                    onSubmit={submit}
                    validationSchema={MailFormSchema}
                >
                {({
                    handleSubmit, 
                    handleChange, 
                    handleBlur,
                    isSubmitting,
                    values}) => (
                        <Form className='form-mail' onSubmit={handleSubmit}>
                            <Field name='recipient' type='email' className='form-control' placeholder='Destinataire' onChange={handleChange} onBlur={handleBlur}/>
                            <span className='text-danger'><ErrorMessage name='recipient' /></span>
                            <Field name='object' type='text' className='form-control mt-1' placeholder='Objet' onChange={handleChange} onBlur={handleBlur} />
                            <Field name='message' component="textarea" rows='10' className='form-control mt-1' onChange={handleChange} onBlur={handleBlur}  />
                            <button type='submit' className='btn btn-dark mt-2' disabled={isSubmitting}>Envoyer</button>
                        </Form>
                    ) }

                </Formik>
            </div>
        </div>
    )
}

export default NewMail