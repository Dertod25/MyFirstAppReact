import React, {Component} from 'react'
import {Link} from 'react-router'
export default class List extends Component {

    render() {
        let arrKey = [...this.props.userList.keys()];
        function filterUser(value) {
            if (value !== "user")return value ;
        }
        let filtered =arrKey.filter(filterUser);
        let users = filtered.map(function (log, id) {
            return (
                <li className="list-group-item" key={id}>{log}</li>
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
                    </div>
                    <div className="column col-xs-10 col-md-6   col-xs-offset-1 col-md-offset-3 ">
                        <ul className="list-group">
                            <h2 className='list-group-heading'>This is the list of those who managed to get here</h2>
                            {users}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
