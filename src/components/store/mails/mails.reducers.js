import * as actions from './mails.actions'

export default (state = {
    data: [],
    error: null,
    isLoading: false
}, action) => {
    switch (action.type) {
        case actions.REQUEST_MAILS:
            return {
                ...state,
                isLoading: true
            }
        case actions.FETCH_MAILS_SUCCESS:
            return {
                ...state,
                data: action.mails ? [...action.mails] : [],
                isLoading: false,
                error: null
            }
        case actions.FETCH_MAILS_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error
            }
        case actions.CREATE_MAIL_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.mail]
            }
        case actions.CREATE_MAIL_ERROR:
            return {
                ...state,
                error: action.error
            }
        case actions.SEEN_MAIL_SUCCESS:
            return {
                ...state,
                data: state.data.map(m => (m.date === action.date) ? {...m, seen:true} : m)
            }
        case actions.SEEN_MAIL_ERROR:
            return {
                ...state,
                error: action.error
            }
    
        default:
            return state
    }
}