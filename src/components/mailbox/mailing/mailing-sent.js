import React from 'react'
import {NavLink} from 'react-router-dom'

const MailingSent = ({mails, path, GenerateDateMail, userLoggedIn, setSelectedMail, setMailList}) => {

    const mailList = mails.map(m => m.transmitter === userLoggedIn.email && {...m, pseudo:(m.recipient.split('@', 1).join()).split('.').join(' ')})
                          .filter(m => m)
                          .sort((a, b) => { 
                            const dateA = new Date(a.date)
                            const dateB = new Date(b.date)
                            if(dateA < dateB) return 1
                            if(dateA > dateB) return -1
                            else return 0
                          })
     
    return (
        <ul className="list-group w-100 listbox">
            { mailList && mailList.length>0 ? (mailList.map((m, index) => (
                <NavLink key={index} to={path+'/mail'} className='navlink'>
                <li className='list-group-item d-flex seen' onClick={() => {setSelectedMail(m); setMailList(mailList)}}>
                    <span className='text-capitalize w-25 text-truncate'>{m.pseudo}</span>
                    <span className='flex-fill text-truncate mr-5' style={{width:'20px'}}><i>{m.object}</i> - <span className='font-weight-light'>{m.message}</span></span>
                    <span>{<GenerateDateMail date={new Date(m.date)}/>}</span>
                </li>
                </NavLink>
            ))) : (
                <li className="list-group-item text-center">Vous ne disposez d'aucun mail envoyé.</li>
            )}
        </ul>
    )
}

export default MailingSent