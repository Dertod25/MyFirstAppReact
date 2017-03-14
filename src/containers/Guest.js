import React, {Component} from 'react'

export default class Guest extends Component {
    static onEnter(nextState, replace) {
        if (localStorage.getItem("user")) {
            replace('/')
        }
    };

    render() {
        return (
            <div className='container'>
                {this.props.children}
            </div>
        )
    }
}
