import { 
    NEW_ALERT, USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS
} from '../actions/types'

const initialState = {
    user: {},
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        case USER_PROFILE_REQUEST:
            return {
                ...state = initialState,
                user: {},
                loading: true
            }
        case USER_PROFILE_SUCCESS:
            return {
                ...state = initialState,
                user: payload.userProfile,
                loading: false
            }
        case USER_PROFILE_FAIL:
            return {
                ...state = initialState,
                user: {},
                loading: false,
                error: payload.error
            }
        case USER_LOGIN_REQUEST:
            return {
                ...state = initialState,
                user: {},
                loading: true
            }
        case USER_LOGIN_SUCCESS:
            return {
                ...state = initialState,
                user: payload.user,
                loading: false
            }
        case USER_LOGIN_FAIL:
            return {
                ...state = initialState,
                user: {},
                loading: false,
                error: payload.error
            }
        default:
            return state;
    }
}