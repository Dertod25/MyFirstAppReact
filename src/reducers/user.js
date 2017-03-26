import {ADD_USER,CHANGE_USER,GET_ALL_USERS,OUT_USER} from '../constants/CONST'



const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {}
};

export default function user(state = initialState, action) {

    switch (action.type) {

        case ADD_USER:
            localStorage.setItem("user", JSON.stringify(action.user));
            return {...state, user: action.user};

        case CHANGE_USER:
            localStorage.setItem("user", JSON.stringify(action.user));
            return {...state, user: action.user};

        case OUT_USER:
            localStorage.removeItem("user");
            return {...state, user: action.user};

        default:
            return state;
    }

}
