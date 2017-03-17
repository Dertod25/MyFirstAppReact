import {OUT_USER} from '../constants/LogOut'
export function LogOutUser(user) {

    return {
        type: OUT_USER,
        user:user
        }

}
