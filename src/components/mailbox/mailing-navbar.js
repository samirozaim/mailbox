import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const MailingNavbar = ({mails, userLoggedIn}) => {

    mails = mails.filter(m => m.recipient === userLoggedIn.email && !m.seen)
    const notseen = mails.length

    const location = useLocation()
    const path = location.pathname

    return (
        <div className='d-flex flex-column py-3 pr-3' style={{minWidth:'268px'}}>
            <NavLink to={`${path}?composer=new`} className='newmsg border text-center ml-2 mt-1 p-3 mb-5 w-100 rounded-pill text-dark shadow-sm'><i className="fa fa-plus"></i> Nouveau message</NavLink>
            <NavLink to='/mailbox/inbox' activeClassName='activenavbarlink' className='d-flex justify-content-between align-items-center navlink navbarlink'>
                <i className="fa fa-envelope-o text-center" style={{width:'50px'}}></i>
                <span className={notseen!==0 ? 'font-weight-bold' : ''}>Boite de réception</span>
                <div className="badge-pill text-right" style={{width:'40px', fontSize:'12px'}}>{notseen!==0 && notseen}</div>
            </NavLink>
            <NavLink to='/mailbox/sent' activeClassName='activenavbarlink' className='navlink navbarlink'>
                <i className="fa fa-angle-double-right text-center" style={{width:'50px'}}></i>
                <span>Messages envoyés</span>
            </NavLink>
        </div>
    )
}

export default MailingNavbar