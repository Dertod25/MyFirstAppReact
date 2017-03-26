import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import SignOut from '../components/SignOut'
import {chengeUser,LogOutUser} from '../actions/ActionsUsers'

class User extends Component {
    static onEnter(nextState, replace) {
        if (localStorage.getItem("user") === null) {
            replace('/signin')
        }
    };

    render() {
        return (
            <div className='container'>
                <div className="row">
                    <div
                        className=" column col-xs-10 col-md-6 col-lg-6  col-xs-offset-1 col-md-offset-3 col-lg-offset-3 ">
                        <div className="row">
                            <div className=" column col-xs-8"><h1><span className="text1">Welcome to Hell</span></h1>
                            </div>
                            <div className=" column col-xs-4"><SignOut LogOutUser={this.props.LogOutUser}/></div>
                        </div>
                    </div>
                    {React.cloneElement(this.props.children, this.props)}
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        userList: state.users
    }
}
function mapDispatchToProps(dispatch) {
    return {
        chengeUser: bindActionCreators(chengeUser, dispatch),
        LogOutUser: bindActionCreators(LogOutUser, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(User)