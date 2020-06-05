import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import MailingInbox from './mailing-inbox';
import MailingSent from './mailing-sent';

const MailingList = ({mails, userLoggedIn}) => {

    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

    const {pathname} = useLocation()
    const {type} = useParams()

    // if(type === 'inbox') {
    //     mails = mails.map(m => m.recipient === userLoggedIn.email && {...m, email:m.transmitter, pseudo:(m.transmitter.split('@', 1).join()).split('.').join(' ')})
    // }
    // else{
    //     mails = mails.map(m => m.transmitter === userLoggedIn.email && {...m, email:m.recipient, pseudo:(m.recipient.split('@', 1).join()).split('.').join(' ')})
    // }

    return (
        <div className='d-flex flex-column flex-fill'>
            {type === 'inbox' ? (
                <MailingInbox mails={mails} path={pathname} days={days} userLoggedIn={userLoggedIn} />
            ) : (
                <MailingSent mails={mails} path={pathname} days={days} userLoggedIn={userLoggedIn}/>
            )}
        </div>
    )
}

export default MailingList