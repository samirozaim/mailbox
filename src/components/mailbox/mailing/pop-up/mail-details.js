import React from 'react'

const MailDetails = (props) => {
    return (
        <>
            <div className='container border d-flex ml-5 position-absolute bg-white shadow p-3 mb-5 bg-white rounded'>
                <div className='w-25 d-flex flex-column align-items-end pr-1 text-secondary'>
                    <span>De: </span>
                    <span>à: </span>
                    <span>Date: </span>
                    <span>Objet: </span>
                    <span>Envoyé par: </span>
                </div>
                <div className='w-100 d-flex flex-column pl-2'>
                    <span><b>{props.transmittersName(props.selectedMail.transmitter)}</b> &lt;{props.selectedMail.transmitter}&gt;</span>
                    <span>{props.transmittersName(props.selectedMail.recipient)} &lt;{props.selectedMail.recipient}&gt;</span>
                    <span>{new Date(props.selectedMail.date).toLocaleString()}</span>
                    <span>{props.selectedMail.object}</span>
                    <span>{(props.selectedMail.transmitter.split('@')[1])}</span>
                </div>
            </div>
        </>
    )
}

export default MailDetails