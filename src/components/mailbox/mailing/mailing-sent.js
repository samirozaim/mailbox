import React from 'react'
import {NavLink} from 'react-router-dom'

const MailingSent = ({mails, path, days, userLoggedIn}) => {

    mails = mails.map(m => m.transmitter === userLoggedIn.email && {...m, pseudo:(m.transmitter.split('@', 1).join()).split('.').join(' ')})
    mails = mails.filter(m => m)
    mails.sort((a, b) => { 
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        if(dateA < dateB) return 1
        if(dateA > dateB) return -1
        else return 0
     })
     
    return (
        <ul className="list-group w-100 listbox">
            { mails && mails.length>0 ? (mails.map((m, index) => (
                <NavLink key={index} to={{
                    pathname: path+'/mail',
                    mailSelected:m
                }} className='navlink'>
                <li className='list-group-item d-flex seen' >
                    <span className='text-capitalize w-25 text-truncate'>{m.pseudo}</span>
                    <span className='flex-fill text-truncate mr-5'><i>{m.object}</i> - <span className='font-weight-light'>{m.message}</span></span>
                    <span>{new Date(m.date).getDay() === new Date().getDay() ? ("0" + new Date(m.date).getHours()).slice(-2) +':'+ ('0'+ new Date(m.date).getMinutes()).slice(-2) : days[new Date(m.date).getDay()] } </span>
                </li>
                </NavLink>
            ))) : (
                <li className="list-group-item text-center">Vous ne disposez d'aucun mail envoyé.</li>
            )}
        </ul>
    )
}

export default MailingSent