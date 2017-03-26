import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.registration = this.registration.bind(this);
    };

    registration() {
        let login = this.login.value;
        let email = this.email.value;
        let password = this.password.value;
        let firstname = this.firstname.value;
        let lastname = this.lastname.value;
        if (!this.props.userList.get(login)) {
            let user = {
                login,
                password,
                email,
                firstname,
                lastname
            };
            this.props.setUser(user);
            // this.props.authUser(user);
            browserHistory.push(`/`)
        } else {
            alert("User with such login already exists")
            alert("Come up with another username")
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2 className="form-signin-heading">
                        <span className="text1">Please Sign Up to </span>
                        <span className="text2">HELL</span>
                    </h2>
                    <div
                        className=" column col-xs-10 col-md-4 col-lg-4  col-xs-offset-1 col-md-offset-4 col-lg-offset-4  door">
                        <form className="form-signin">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Login"
                                ref={(input) => {
                                    this.login = input;
                                }}
                            />
                            <input type="email"
                                   className="form-control"
                                   placeholder="email"
                                   ref={(input) => {
                                       this.email = input;
                                   }}
                            />
                            <input type="text"
                                   className="form-control"
                                   placeholder="First name"
                                   ref={(input) => {
                                       this.firstname = input;
                                   }}
                            />
                            <input type="text"
                                   className="form-control"
                                   placeholder="Last name"
                                   ref={(input) => {
                                       this.lastname = input;
                                   }}
                            />
                            <input type="password"
                                   className="form-control"
                                   placeholder="Password min 6 values "
                                   ref={(input) => {
                                       this.password = input;
                                   }}
                            />
                        </form>
                        <button type="button"
                                className="btn btn-lg btn-danger btn-block"
                                onClick={this.registration}>Sign Up
                        </button>
                        <Link to="/signin" className="rotate"> You have account?</Link>

                    </div>
                </div>
            </div >
        )
    }
}
