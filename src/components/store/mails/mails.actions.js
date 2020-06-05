import apiFirebase from "../../conf/apiFirebase"


export const REQUEST_MAILS = 'request mails'
export const FETCH_MAILS = 'fetch mails'
export const FETCH_MAILS_SUCCESS = 'fetch mails success'
export const FETCH_MAILS_ERROR = 'fetch mails error'

export const TRY_CREATE_MAIL = 'try create mail'
export const CREATE_MAIL_SUCCESS = 'create mail success'
export const CREATE_MAIL_ERROR = 'create mail error'

export const TRY_SEEN_MAIL = 'try seen mail'
export const SEEN_MAIL_SUCCESS = 'seen mail success'
export const SEEN_MAIL_ERROR = 'seen mail error'


// Fetch mails from firebase

export const fetchMailsAction = () => {
    return (dispatch, getState) => {
        dispatch(requestMailsAction())
        return apiFirebase.fbFetchMails().then(
            mails => dispatch(fetchMailsSuccessAction(mails)),
            error => dispatch(fetchMailsErrorAction(error))
        )
    }
}

export const requestMailsAction = () => ({
    type: REQUEST_MAILS
})

export const fetchMailsSuccessAction = (mails) => ({
    type: FETCH_MAILS_SUCCESS,
    mails
})

export const fetchMailsErrorAction = (error) => ({
    type: FETCH_MAILS_ERROR,
    error
})

// Create new mail

export const tryCreateMailAction = (mail) => {
    return async (dispatch, getState) => {
        const mails = [...getState().mails.data, mail]
        try {
            await apiFirebase.fbSaveMails(mails)
            dispatch(createMailSuccessAction(mail))
        } catch (error) {
            dispatch(createMailErrorAction(error))
        }
       
    }
}

export const createMailSuccessAction = (mail) => ({
    type: CREATE_MAIL_SUCCESS,
    mail
})

export const createMailErrorAction = (error) => ({
    type: CREATE_MAIL_ERROR,
    error
})

// Try seen mail

export const trySeenMailAction = (date) => {
    return async (dispatch, getState) => {
        const mails = getState().mails.data.map(m => m.date === date ? {...m, seen:true} : m)
        try {
            await apiFirebase.fbSaveMails(mails)
            dispatch(seenMailSuccessAction(date))
        } catch (error) {
            dispatch(seenMailErrorAction(error))
        }
    }
}

export const seenMailSuccessAction = (date) => ({
    type: SEEN_MAIL_SUCCESS,
    date
})

export const seenMailErrorAction = (error) => ({
    type: SEEN_MAIL_ERROR,
    error
})