import * as types from './constants'


export function openModal() {
    return {
        type: types.OPEN_MODAL
    }
}

export function formUpdate(payload) {
    return {
        type: types.FORM_UPDATE,
        payload:payload
    }
}

export function saveMailingListItem(payload) {
    return {
        type: types.SUBMIT_FORM,
        payload: payload
    }
}