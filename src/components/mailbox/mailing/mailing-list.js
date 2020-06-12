import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import MailingInbox from './mailing-inbox';
import MailingSent from './mailing-sent';

const MailingList = ({mails, userLoggedIn, setSelectedMail}) => {

    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"];

    const {pathname} = useLocation()
    const {type} = useParams()

    const GenerateDateMail = ({date}) => {
        const dateNow = new Date()

        const diffTime = Math.abs(dateNow - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        console.log('diffTime : ',diffTime)
        console.log('diffDays : ',diffDays)

        if (diffDays === 1) return ("0" + new Date(date).getHours()).slice(-2) +':'+ ('0'+ new Date(date).getMinutes()).slice(-2)
        else if (diffDays <= 7) return days[new Date(date).getDay()]
        else return date.getDate() +' '+ months[date.getMonth()]
    } 

    return (
        <div className='d-flex flex-column flex-fill'>
            {type === 'inbox' ? (
                <MailingInbox GenerateDateMail={GenerateDateMail} mails={mails} setSelectedMail={setSelectedMail} path={pathname} days={days} months={months} userLoggedIn={userLoggedIn} />
            ) : (
                <MailingSent GenerateDateMail={GenerateDateMail} mails={mails} setSelectedMail={setSelectedMail} path={pathname} days={days} months={months} userLoggedIn={userLoggedIn}/>
            )}
        </div>
    )
}

export default MailingList