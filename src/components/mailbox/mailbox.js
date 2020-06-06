import React, { useEffect } from 'react'
import MailingNavbar from './mailing-navbar'
import MailingList from './mailing/mailing-list'
import { Route, useLocation } from 'react-router-dom'
import NewMail from './new-mail'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMailsAction } from '../store/actions'
import { mailsSelector } from '../store/selectors'
import queryString from 'query-string'
import Mail from './mail'

const MailBox = ({userLoggedIn}) => {

    const dispatch = useDispatch()
    const mails = useSelector((state) => mailsSelector(state))

    useEffect(() => {
        dispatch(fetchMailsAction())
    }, [dispatch])

    const location = useLocation()
    const {composer} = queryString.parse(location.search)
    const {mailSelected} = location
    
    return (
        <div className='mailbox d-flex flex-fill'>
            <MailingNavbar mails={mails} userLoggedIn={userLoggedIn} />
            {/* <Route path='/mailbox/:inbox' component={MailingNavbar} /> */}
            <Route exact path='/mailbox/:type' component={() => <MailingList mails={mails} userLoggedIn={userLoggedIn} />} />
            <Route path='/mailbox/:type/mail' component={() => <Mail mailSelected={mailSelected} userLoggedInEmail={userLoggedIn.email} />} />
            {composer && composer === 'new' ? (<NewMail userLoggedIn={userLoggedIn} />) : null}
            {/* <Route path='/mailbox/:type' component={() => <NewMail userLoggedIn={userLoggedIn} />} /> */}
            {/* <Route path='/mailbox/:type/' component={NewMail} /> */}
        </div>
    )
}

export default MailBox