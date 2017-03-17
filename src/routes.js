import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import List from './components/List'
import Profile from './components/profile'
import User from './containers/User'
import Guest from './containers/Guest'
import ChangeProfile from './components/ChangeProfile'
export const ROUTES = (
    <Router history={browserHistory}>
        <Route path='/' component={User} onEnter={User.onEnter}>
            <IndexRoute component={List}/>
            <Route path='/list' component={List}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/changeprofile' component={ChangeProfile}/>

        </Route>
        <Route component={Guest} onEnter={Guest.onEnter}>
            <IndexRoute component={SignIn}/>
            <Route path='/signin' component={SignIn}/>
            <Route path='/signup' component={SignUp}/>
        </Route>
    </Router>
);

