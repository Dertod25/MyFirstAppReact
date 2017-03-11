import React from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import List from './components/List'
import Profile from './components/profile'
export const ROUTES = (
    <Router history={browserHistory}>
        <Route path='/' component={List} onEnter={List.onEnter}/>
        <Route path='/signin' component={SignIn} onEnter={SignIn.onEnter}/>
        <Route path='/signup' component={SignUp} onEnter={SignIn.onEnter}/>
        <Route path='/profile' component={Profile} onEnter={List.onEnter}/>
    </Router>
);

