import * as types from './constants'

const initialState={
    dialogOpen: false,
    drawerOpen: false,
    //name: '',
    //email: '',
    //entitytype: '',
    //entityName:'',
    //entities: ['athlete', 'coach', 'scout', 'team', 'institution']
}

export function mailingReducer(state=initialState, action) {
    switch(action.type) {
        case types.TOGGLE_DIALOG:
            return Object.assign({}, state, {
                dialogOpen: !state.dialogOpen
            })
        case types.TOGGLE_DRAWER:
            return Object.assign({}, state, {
                drawerOpen: !state.drawerOpen
            })
        default:
            return state
    }
}