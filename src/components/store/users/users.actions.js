import apiFirebase from '../../conf/apiFirebase'

export const REQUEST_USERS = 'request users'
export const FETCH_USERS = 'fetch users'
export const FETCH_USERS_SUCCESS = 'fetch users success'
export const FETCH_USERS_ERROR = 'fetch users error'

export const TRY_CREATE_USER = 'try create user'
export const CREATE_USER_SUCCESS = 'create user success'
export const CREATE_USER_ERROR = 'create user error'

// Try fetch users from firebase

export const fetchUsersAction = () => {
    return (dispatch, getState) => {
        dispatch(requestUsersAction())
        return apiFirebase.fbFetchUsers().then(
            users => dispatch(fetchUsersSuccessAction(users)),
            error => dispatch(fetchUsersErrorAction(error))
        )
    }
}

export const requestUsersAction = () => ({
    type: REQUEST_USERS
})

export const fetchUsersSuccessAction = (users) => ({
    type: FETCH_USERS_SUCCESS,
    users
})

export const fetchUsersErrorAction = (error) => ({
    type: FETCH_USERS_ERROR,
    error
})

// Try create user

export const tryCreateUserAction = (user) => {
    return async (dispatch, getState) => {
        const users = [...getState().users.data, user]
        try {
            await apiFirebase.fbSaveUsers(users)
            dispatch(createUserSuccessAction(user))
            
        } catch (error) {
            dispatch(createUserErrorAction(error))
        }
    }
}

export const createUserSuccessAction = (user) => ({
    type: CREATE_USER_SUCCESS,
    user
})

export const createUserErrorAction = (error) => ({
    type: CREATE_USER_ERROR,
    error
})
