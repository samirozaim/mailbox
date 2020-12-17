import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MailDetails from './mailing/pop-up/mail-details'

const Mail = ({selectedMail, setSelectedMail, userLoggedInEmail, mailList}) => {

    const history = useHistory()
    const [showDetails, setShowDetails] = useState(false)

    if(!selectedMail)
        history.push('/mailbox')

    const tryRequire = (path) => {
        try {
            return require(`../avatar/${path}`);
        } catch (err) {
            return require(`../avatar/default.jpg`);
        }
    };

    const mailAfterBefore = (param) => {
        const index = mailList.indexOf(selectedMail) + param

        if(index>=0 && index<mailList.length)
            setSelectedMail(mailList[index])
    }

    const transmittersName = (transmitter) => {
       return (transmitter.split('@', 1).join()).split('.').join(' ').toUpperCase()
    }

    return (
        <>
        {selectedMail && (
            <div className='d-flex flex-column flex-fill'>
                <div className='d-flex justify-content-between p-3 border-bottom'>
                    <i className="fa fa-arrow-left" onClick={() => history.goBack()}></i>
                    <div className='mr-3'>
                        <label className='mr-4'>{mailList.indexOf(selectedMail)+1} sur {mailList.length}</label>
                        <i className="fa fa-angle-left mr-4" title='plus récents' onClick={() => mailAfterBefore(-1)} style={{fontSize:'20px'}}></i>
                        <i className="fa fa-angle-right" title='plus anciens' onClick={() => mailAfterBefore(+1)} style={{fontSize:'20px'}}></i>
                    </div>
                </div>
                <span className='mt-3' style={{fontSize:'22px', marginLeft:'70px'}}>{selectedMail.object}</span>
                <div className='d-flex flex-row flex-fill mt-4 pr-5'>
                    <div style={{width:'70px'}} className='text-center'>
                        <img className='rounded-pill' src={tryRequire(`${selectedMail.transmitter.split('@', 1).join()}.jpg`)} width='50' height='40' alt='img'/>
                    </div>
                    <div className='d-flex flex-column flex-fill w-75'>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <span className='font-weight-bold'> {transmittersName(selectedMail.transmitter)} </span>
                                <span style={{fontSize:'13px'}}> ({selectedMail.transmitter})</span>
                            </div>
                            <span style={{fontSize:'13px'}}>{new Date(selectedMail.date).toLocaleString()}</span>
                        </div>
                        <span style={{fontSize:'13px'}}>
                            À <i className='text-capitalize'>{!(selectedMail.recipient === userLoggedInEmail) ? selectedMail.recipient.split('.', 1).join() : 'moi'}</i>
                            <i className={"text-secondary ml-2 " + (showDetails ? "fa fa-caret-up" : "fa fa-caret-down")} onClick={() => setShowDetails(!showDetails)}></i>
                            {showDetails ? <MailDetails selectedMail = {selectedMail} transmittersName={transmittersName}/> : false}
                        </span>
                        <div className='mt-5' style={{whiteSpace:'pre-line'}}>{selectedMail.message}</div>
                    </div>
                </div>
            </div> 
        )}
        </>  
       
    )
}

export default Mail