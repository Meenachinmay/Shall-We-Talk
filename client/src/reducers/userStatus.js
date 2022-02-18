import {
    CHANGING_USER_STATUS,
    SET_USER_STATUS
} from '../actions/types'

const initialState = {
    status: 0
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case CHANGING_USER_STATUS:
            return {
                ...state = initialState,
                status: payload.status
            }
        case SET_USER_STATUS:
            return {
                ...state = initialState,
                status: payload
            }
        default:
            return state
    }
}