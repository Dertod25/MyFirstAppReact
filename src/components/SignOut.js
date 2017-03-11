import React, {Component} from 'react'
import {Link} from 'react-router'
export default class SignOut extends Component {
    signOut() {
        localStorage.removeItem("user")
    };

    render() {
        return (

            <Link to="/signin"
                  className="btn btn-lg btn-danger "
                  onClick={this.signOut}
            >Sign Out
            </Link>
        )
    }
}