import {CHANGE_USER} from '../constants/ChangeUser'
export function chengeUser(user) {

    return {
        type: CHANGE_USER,
        user:user
    }

}
