import {AUTH_USER} from '../constants/AuthenticationUser'
export function setUser(user) {

    return {
        type: AUTH_USER,
        user:user
    }

}
