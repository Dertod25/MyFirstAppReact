import React from 'react';
import {Router, Route,IndexRoute,IndexRedirect, browserHistory} from 'react-router'
import SignIn from './components/SignIn'
import SignUp from './containers/SignUp'
import List from './components/List'
import Profile from './components/profile'
import User from './containers/User'
export const ROUTES = (
    <Router history={browserHistory}>
        <Route path='/' component={User} onEnter={User.onEnter}>
            <IndexRoute component={List} />
            <Route path='/list' component={List} />
            <Route path='/profile' component={Profile}>
                {/*<IndexRoute component={SignUp} />*/}
                {/*<Route path='/signup' component={SignUp} />*/}
            </Route>

        </Route>
        <Route path='/signin' component={SignIn} onEnter={SignIn.onEnter}/>
        <Route path='/signup' component={SignUp} onEnter={SignIn.onEnter}/>

    </Router>
);

