import {combineReducers} from 'redux'
import users from './users'
import user from './user'
export const rootReducer = combineReducers({
    users,
    user
})
