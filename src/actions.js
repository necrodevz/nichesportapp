import * as types from './constants'


export function toggleDialog() {
    return {
        type: types.TOGGLE_DIALOG
    }
}

export function toggleDrawer() {
    return {
        type: types.TOGGLE_DRAWER
    }
}

export function saveMailingListItem(payload) {
    console.log(payload)
}