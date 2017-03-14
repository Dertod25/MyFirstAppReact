import { ADD_USER } from '../constants/User'

// const initialState = JSON.parse(window.localStorage.getItem('user')) || {}

const initialState = {}

export default function User(state=initialState, action) {

    switch (action.type) {
        case ADD_USER:
            return {...state, form:action.form }

        default:
            return state;
    }

}
