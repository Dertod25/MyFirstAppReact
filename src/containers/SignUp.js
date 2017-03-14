import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Form from '../components/Form'
import * as formActions from '../actions/AddUser'
class SignUp extends Component {


    render() {
        const { form } = this.props
        const { setUser } = this.props.formActions
        return (
            <div className="container">
                <div className="row">

                    <h2 className="form-signin-heading">
                        <span className="text1">Please Sign Up to </span>
                        <span className="text2">HELL</span>
                    </h2>
                    <div
                        className=" column col-xs-10 col-md-4 col-lg-4  col-xs-offset-1 col-md-offset-4 col-lg-offset-4  door">
                        <Form setUser={ setUser }/>

                            <Link to="/signin" className="rotate"> You have account?</Link>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        form: state.form
    }
}

function mapDispatchToProps(dispatch) {
    return {
        formActions: bindActionCreators(formActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)