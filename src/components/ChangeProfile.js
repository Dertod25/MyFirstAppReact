import React, {Component} from 'react'
import {Link} from 'react-router'
export default class ChangeProfile extends Component {
    constructor(props) {
        super(props);
        this.chengProfileUser = this.chengProfileUser.bind(this);
    };

    chengProfileUser() {
        let login = this.props.user.user.login;
        let email = this.email.value;
        let password = this.password.value;
        let firstName = this.firstName.value;
        let lastName = this.lastName.value;
        let user = {
            login,
            password,
            email,
            firstName,
            lastName
        };
        this.props.chengeUser(user)
    }

    render() {
        let defaultUser = this.props.user.user;
        return (
            <div className="container">
                <div className="row">
                    <div className="nav column col-xs-10 col-md-6   col-xs-offset-1 col-md-offset-3">
                        {`    `}<Link to="/list" className="btn btn-lg btn-danger ">List </Link>{" "}
                        <Link to="/profile" className="btn btn-lg btn-danger ">Profile </Link>
                    </div>
                    <div
                        className=" column col-xs-10 col-md-6   col-xs-offset-1 col-md-offset-3  ">
                        <form className="form-signin">
                            <li className="list-group-item">{defaultUser.login}</li>
                            <input type="email"
                                   className="form-control"
                                   placeholder="email"
                                   defaultValue={defaultUser.email}
                                   ref={(input) => {
                                       this.email = input;
                                   }}
                            />
                            <input type="text"
                                   className="form-control"
                                   placeholder="First name"
                                   defaultValue={defaultUser.firstName}
                                   ref={(input) => {
                                       this.firstName = input;
                                   }}
                            />
                            <input type="text"
                                   className="form-control"
                                   placeholder="Last name"
                                   defaultValue={defaultUser.lastName}
                                   ref={(input) => {
                                       this.lastName = input;
                                   }}
                            />
                            <input type="password"
                                   className="form-control"
                                   placeholder="Password min 6 values "
                                   defaultValue={defaultUser.password}
                                   ref={(input) => {
                                       this.password = input;
                                   }}
                            />
                            <button type="button"
                                    className="btn btn-lg btn-danger btn-block"
                                    onClick={this.chengProfileUser}>Save changes
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

