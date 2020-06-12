import React from 'react'
import { useHistory } from 'react-router-dom'

const Mail = ({selectedMail, userLoggedInEmail}) => {

    const history = useHistory()

    if(!selectedMail)
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
        {selectedMail && (
            <div className='d-flex flex-column flex-fill'>
                <div className='d-flex justify-content-between p-3 border-bottom'>
                    <i className="fa fa-arrow-left" onClick={() => history.goBack()}></i>
                    <div className='mr-3'>
                        <label className='mr-4'></label>
                        <i className="fa fa-angle-left mr-4" title='plus récents' style={{fontSize:'20px'}}></i>
                        <i className="fa fa-angle-right" title='plus anciens' style={{fontSize:'20px'}}></i>
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
                                <span className='font-weight-bold'> {(selectedMail.transmitter.split('@', 1).join()).split('.').join(' ').toUpperCase()} </span>
                                <span style={{fontSize:'13px'}}> ({selectedMail.transmitter})</span>
                            </div>
                            <span style={{fontSize:'13px'}}>{new Date(selectedMail.date).toLocaleString()}</span>
                        </div>
                        <span style={{fontSize:'13px'}}>À <i className='text-capitalize'>{!(selectedMail.recipient === userLoggedInEmail) ? selectedMail.recipient.split('.', 1).join() : 'moi'}</i></span>
                        <div className='mt-5' style={{whiteSpace:'pre-line'}}>{selectedMail.message}</div>
                    </div>
                </div>
            </div> 
        )}
        </>  
       
    )
}

export default Mail