import {ADD_USER, CHANGE_USER, GET_ALL_USERS,GET_SINGLE_USER,OUT_USER} from '../constants/CONST'
import axios from 'axios'

export function getUsers() {
    const request = axios.get(`/api/db/users`);
    return {
        type: GET_ALL_USERS,
        payload: request,
    }
}
window.onload=getUsers();
const AllUsers=getUsers();
console.log(AllUsers.payload);

// export function getSingleUser(user) {
//     const request = axios.get(`/api/db/users/:id`, user);
//     return {
//         type: GET_SINGLE_USER,
//         payload:request,
//         user:user
//     }
//
// }
export function setUser(user) {
    const request = axios.post(`/api/db/users`, user);
    return {
        type: ADD_USER,
        payload: request,
        user: user
    }

}

export function chengeUser(user) {
    const request = axios.put(`/api/db/users/:id`, user);
    return {

        type: CHANGE_USER,
        payload: request,
        user: user
    }

}
export function LogOutUser(user) {

    return {
        type: OUT_USER,
        user: user
    }

}