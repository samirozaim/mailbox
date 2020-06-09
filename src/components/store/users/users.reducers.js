import * as actions from './users.actions'

export default (state = {
    data: [],
    error: null,
    isLoading: false
}, action) => {
    switch (action.type) {
        case actions.CREATE_USER_SUCCESS:
            return {
                ...state,
                data: [...state.data, action.user]
            }

        case actions.CREATE_USER_ERROR:
            return {
                ...state,
                error: action.error
            }

        case actions.REQUEST_USERS:
            return {
                ...state,
                isLoading: true
            }

        case actions.FETCH_USERS_SUCCESS:
            return {
                ...state,
                data: action.users ? [...action.users] : [],
                isLoading: false,
                error: null
            }

        case actions.FETCH_USERS_ERROR:
            return {
                ...state,
                error: action.error,
                isLoading: false
            }    


        default:
            return state
    }
}