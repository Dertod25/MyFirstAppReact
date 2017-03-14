import React, {Component} from 'react'
import Link from 'react-router'

export default class User extends Component {

    static onEnter(nextState, replace) {
        if (!localStorage.getItem("user")) {
            replace('/signin')
        }
    };

    render() {
        return (
            <div className='container'>
                <h1>Welcome</h1>
                {this.props.children}
            </div>
        )
    }
}

