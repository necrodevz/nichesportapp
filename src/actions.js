import * as types from './constants'


export function openModal() {
    return {
        type: types.OPEN_MODAL
    }
}

export function emailUpdate() {
    return {
        type: types.EMAIL_UPDATE
    }
}

export function saveEmail(email) {
    return {
        type: types.SAVE_EMAIL,
        payload: {
            email: email
        }
    }
}