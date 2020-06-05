import React from 'react'
import { useHistory } from 'react-router-dom'

const Mail = ({mailSelected, userLoggedInEmail}) => {

    const history = useHistory()

    if(!mailSelected)
        history.push('/mailbox')

    const tryRequire = (path) => {
        try {
            return require(`../avatar/${path}`);
        } catch (err) {
            return require(`../avatar/default.jpg`);
        }
    };

    return (
        <>
        {mailSelected && (
            <div className='d-flex flex-column flex-fill'>
                <div className='p-3 border-bottom'><i className="fa fa-arrow-left" onClick={() => history.goBack()}></i></div>
                <span className='mt-3' style={{fontSize:'22px', marginLeft:'70px'}}>{mailSelected.object}</span>
                <div className='d-flex flex-row flex-fill mt-4 pr-5'>
                    <div style={{width:'70px'}} className='text-center'>
                        <img className='rounded-pill' src={tryRequire(`${mailSelected.transmitter.split('@', 1).join()}.jpg`)} width='50' height='40' alt='img'/>
                    </div>
                    <div className='d-flex flex-column flex-fill'>
                        <div className='d-flex justify-content-between'>
                            <div>
                                <span className='font-weight-bold'> {mailSelected.pseudo.toUpperCase()} </span>
                                <span style={{fontSize:'13px'}}> ({mailSelected.transmitter})</span>
                            </div>
                            <span style={{fontSize:'13px'}}>{new Date(mailSelected.date).toLocaleString()}</span>
                        </div>
                        <span style={{fontSize:'13px'}}>À <i className='text-capitalize'>{!(mailSelected.recipient === userLoggedInEmail) ? mailSelected.recipient.split('.', 1).join() : 'moi'}</i></span>
                        <div className='mt-5' style={{whiteSpace:'pre-line'}}>{mailSelected.message}</div>
                    </div>
                </div>
            </div> 
        )}
        </>  
       
    )
}

export default Mail