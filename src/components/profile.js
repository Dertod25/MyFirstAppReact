import React, {Component} from 'react'
import {Link} from 'react-router'
export default class Profile extends Component {
    render() {
        let User = this.props.user.user
        return (
            <div className='container'>
                <div className="row">
                    <div className="nav column col-xs-10 col-md-6   col-xs-offset-1 col-md-offset-3">
                        {"   "}  <Link to="/list" className="btn btn-lg btn-danger">List</Link>{" "}
                        <Link to="/changeprofile" className="btn btn-lg btn-danger ">ChangeProfile</Link>
                    </div>
                    <div className="column col-xs-10 col-md-6   col-xs-offset-1 col-md-offset-3 ">

                        <ul className="list-group">
                            <h2 className='list-group-heading'>This is data about you</h2>
                            <li className="list-group-item">Login: {User.login} </li>
                            <li className="list-group-item">Password: {User.password} </li>
                            <li className="list-group-item">Email: {User.email} </li>
                            <li className="list-group-item">First Name: {User.firstname} </li>
                            <li className="list-group-item">Last Name: {User.lastname} </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
