import * as types from './constants'

const initialState={
    isOpen: false
}

export function mailingReducer(state=initialState, action) {
    switch(action.type) {
        case types.OPEN_MODAL:
            return Object.assign({}, state, {
                isOpen: true,
                email: ''
            })
        case types.EMAIL_UPDATE:
            return Object.assign({}, state, {
                email: action.payload.email
            })
        default:
            return state
    }
}