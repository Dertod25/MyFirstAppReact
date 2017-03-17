import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.showInput = this.showInput.bind(this);
    };

    showInput() {
        let login = this.login.value;
        let password = this.password.value;

        if (this.props.userList.get(login)) {
            let User = this.props.userList.get(login);
            if (User.password === password) {
                this.props.setUser(User);
                browserHistory.push(`/`)
            } else {
                alert("Incorrect password")
            }
        } else {
            alert("User with this name does not exist")
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2 className="form-signin-heading">
                        <span className="text1">Please Sign In to </span>
                        <span className="text2">HELL</span>
                    </h2>
                    <div
                        className=" column col-xs-10 col-md-4 col-lg-4  col-xs-offset-1 col-md-offset-4 col-lg-offset-4  door">
                        <form className="form-signin">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Login"
                                defaultValue=""
                                ref={(input) => {
                                    this.login = input;
                                }}
                            />
                            <input type="password"
                                   className="form-control"
                                   placeholder="Password"
                                   ref={(input) => {
                                       this.password = input;
                                   }}
                            />
                            <Link to="/signup" className="rotate"> You don't have account?</Link>
                        </form>
                        <button type="button"
                                className="btn btn-lg btn-danger btn-block"
                                onClick={this.showInput}
                        >Sign In
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}