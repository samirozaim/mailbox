import React from 'react'
import {NavLink} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { trySeenMailAction } from '../../store/actions'

const MailingInbox = ({mails, path, GenerateDateMail, userLoggedIn, setSelectedMail}) => {

    const dispatch = useDispatch()

    mails = mails.map(m => m.recipient === userLoggedIn.email && {...m, pseudo:(m.transmitter.split('@', 1).join()).split('.').join(' ')})
    mails = mails.filter(m => m)
    mails.sort((a, b) => { 
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        if(dateA < dateB) return 1
        if(dateA > dateB) return -1
        else return 0
     })

    const viewSelectedMail = (selectedMail) => {
        dispatch(trySeenMailAction(selectedMail.date))
        setSelectedMail(selectedMail)
    }

    return (
        <ul className="list-group w-100 listbox">
            { mails && mails.length>0 ? (mails.map((m, index) => (
                <NavLink key={index} to={path+'/mail'} className='navlink'>
                <li className={ m.seen ? 'list-group-item d-flex seen' : 'list-group-item d-flex'} onClick={ () => viewSelectedMail(m)}>
                    <span className={'text-capitalize w-25 text-truncate '+(!m.seen && 'font-weight-bold text-capitalize w-25 text-truncate')}>{m.pseudo}</span>
                    <span className='flex-fill mr-5 text-truncate' style={{width:'20px'}}><i className={!m.seen ? 'font-weight-bold' : undefined}>{m.object}</i> - <span className='text-secondary'>{m.message}</span></span>
                    <span>{<GenerateDateMail date={new Date(m.date)}/>}</span>
                </li>
                </NavLink>
            ))) : (
                <li className="list-group-item text-center">Vous ne disposez d'aucun mail reçu.</li>
            )}
        </ul>
    )
}

export default MailingInbox