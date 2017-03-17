import {ADD_USER} from '../constants/Users'
export function setUser(user) {

    return {
        type: ADD_USER,
        user:user
    }

}