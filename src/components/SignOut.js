import React, {Component} from 'react'
import {Link} from 'react-router'
export default  class SignOut extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    };

    signOut() {
        this.props.LogOutUser({})
    };

    render() {
        return (
            <div className="btn-sign-out">
                <Link to="/signin"
                      className="btn btn-lg btn-danger "
                      onClick={this.signOut}
                >Sign Out
                </Link>
            </div>
        )
    }
}
