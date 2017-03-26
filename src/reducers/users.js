import {ADD_USER, CHANGE_USER, GET_ALL_USERS, OUT_USER} from '../constants/CONST'

let Users = new Map;
let lsl = localStorage.length;
for (let i = 0; i < lsl; i++) {
    let key = localStorage.key(i);
    Users.set(key, JSON.parse(localStorage.getItem(key)))
}

const initialState = Users;

export default function users(state = initialState, action) {

    switch (action.type) {
        case ADD_USER:
            // localStorage.setItem(`${action.user.login}`, JSON.stringify(action.user));
            console.log(action.user)
            let newMap = new Map(state)
            let newState = newMap.set(action.user.login, action.user);
            return newState;

        case CHANGE_USER:
            // localStorage.setItem(`${action.user.login}`, JSON.stringify(action.user));
            let newM = new Map(state)
            let newSt = newM.set(action.user.login, action.user);
            return newSt;

        default:
            return state;
    }
}
