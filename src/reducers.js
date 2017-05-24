import * as types from './constants'

const initialState={
    isOpen: false,
    name: '',
    email: '',
    entitytype: 'athlete',
    entityName:'',
    entities: ['athlete', 'coach', 'scout', 'team', 'institution']
}

export function mailingReducer(state=initialState, action) {
    switch(action.type) {
        case types.OPEN_MODAL:
            return Object.assign({}, state, {
                isOpen: true
            })
        case types.FORM_UPDATE:
            return Object.assign({}, state, {
                [action.payload.id]:action.payload.value
            })
        default:
            return state
    }
}