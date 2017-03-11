import React, {Component} from 'react'
import {Link} from 'react-router'
import SignOut from './SignOut'
export default class List extends Component {

    static onEnter(nextState, replace) {

        if (!localStorage.getItem("user")) {
            replace('/signin')
        }

    }

    render() {
        let arrKey = [];
        let lsl = localStorage.length;
        for (let i = 0; i < lsl; i++) {
            let key = localStorage.key(i);
            if (key.indexOf("mask_") == 0) {
                arrKey.push(key)
            }
        }
        let userList = arrKey.map(function (log, id) {
            let login = log.split('_')[1];
            return (
                <li className="list-group-item" key={id}>{login}</li>
            )

        });
        return (
            <div className='container'>
                <div className="row">
                    <div className="nav column col-xs-10 col-md-6   col-xs-offset-1 col-md-offset-3">
                        <Link to="/profile"
                              className="btn btn-lg btn-danger "
                        >Profile
                        </Link>
                        <SignOut/>
                    </div>
                    <div className="column col-xs-10 col-md-6   col-xs-offset-1 col-md-offset-3 ">
                        <ul className="list-group">
                            <h2 className='list-group-heading'>This is the list of those who managed to get here</h2>
                            {userList}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};

