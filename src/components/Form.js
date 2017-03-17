import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
export default class Form extends Component {
    constructor(props) {
        super(props);
        this.registration = this.registration.bind(this);
    };

    registration() {
console.log(this.props)
        // let login = this.login.value;
        // let email = this.email.value;
        // let password = this.password.value;
        // let firstName = this.firstName.value;
        // let lastName = this.lastName.value;
        //
        // const {userlist}=this.props
        // if (!userlist.get(login)) {
        //     let user = {
        //         login,
        //         password,
        //         email,
        //         firstName,
        //         lastName
        //     }
        //     this.props.setUser(user);
        //     // this.props.authUser(user);
        //     browserHistory.push(`/`)
        // } else {
        //     alert("User with such login already exists")
        //     alert("Come up with another username")
        //
        // }
        //     let str = JSON.stringify(user);
        //     if (login.length > 0 && password.length >= 6 && email.length > 0) {
        //         if (!localStorage.getItem(login)) {
        //             localStorage.setItem(`mask_${login}`, str);
        //             localStorage.setItem("user", str);
        //             browserHistory.push(`/`)
        //         } else {
        //             alert("User with such login already exists")
        //             alert("Come up with another username")
        //         }
        //     } else {
        //         alert("Fill in all the fields")
        //     }
    }

    render() {

        return (
            <div>
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
                               this.firstName = input;
                           }}
                    />
                    <input type="text"
                           className="form-control"
                           placeholder="Last name"
                           ref={(input) => {
                               this.lastName = input;
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
                <button  type="button"
                      className="btn btn-lg btn-danger btn-block"
                      onClick={this.registration}>Sign Up
                </button>
            </div>
        )
    }
}
