import React, {Component} from 'react'
import {Link} from 'react-router'
import SignOut from './SignOut'
export default class Profile extends Component {
    render() {
        let User = Object.entries(JSON.parse(localStorage.getItem("user")));

        let userProfile = User.map(function (arr) {

            return ( arr.map(function (id, log) {
                return (
                    <li className="list-group-item profile" key={log}>{id}</li>
                )
            }))
        });
        return (
            <div className='container'>
                <div className="row">
                    <div className="nav column col-xs-10 col-md-6   col-xs-offset-1 col-md-offset-3">
                        <Link to="/signup"
                              className="btn btn-lg btn-danger "
                        >List
                        </Link>
                        <SignOut/>
                    </div>
                    <div className="column col-xs-10 col-md-6   col-xs-offset-1 col-md-offset-3 ">

                        <ul className="list-group">
                            <h2 className='list-group-heading'>This is data about you</h2>
                            {userProfile}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

