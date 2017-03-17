import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {setUser} from '../actions/AddUser'
class Guest extends Component {
    static onEnter(nextState, replace) {
        if (localStorage.getItem("user")) {
            replace('/')
        }
    };

    render() {
        return (
            <div className='container'>
                {React.cloneElement(this.props.children, this.props)}
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userList: state.users
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setUser: bindActionCreators(setUser, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Guest)