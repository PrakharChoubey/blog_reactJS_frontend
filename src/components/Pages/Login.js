import React, { Component } from 'react';
import Field from '../Common/Field';
import { withFormik, validateYupSchema } from 'formik';
import { connect } from 'react-redux'
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions'

const fields = [
    { name: 'email', ename: 'input', type: 'email', placeholder: 'Your Email' },
    { name: 'password', ename: 'input', type: 'password', placeholder: 'Your Password' }]

class Login extends Component {
    render() {
        return (
            <div className="login-page">
                <div className='container'>
                    <div className="login-form">
                        <div className="row">
                            <h1>LOGIN</h1>
                        </div>
                        <div className="row">
                            <form className="row"
                                onSubmit={e => {
                                    e.preventDefault();
                                    this.props.login(this.props.values.email, this.props.values.password);
                                }}>
                                {fields.map((f, i) => {
                                    return (
                                        <div className="col-md-12">
                                            <Field
                                                {...f}
                                                key={i}
                                                value={this.props.values[f.name]}
                                                onChange={this.props.handleChange}
                                                onBlur={this.props.handleBlur}
                                                touched={(this.props.touched[f.name])}
                                                errors={this.props.errors[f.name]}
                                            />
                                        </div>
                                    )
                                })}
                                <div className="col-md-12">
                                    <button className="btn btn-primary" type="submit">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => {
            console.log('Loggin in.......', email);
            dispatch(AuthActions.login(email, password))
        }
    }
}

export default connect(
    mapStatesToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }), validationSchema: Yup.object().shape({
        email: Yup.string().email('Not a valid email').required('You need to login with an email address'),
        password: Yup.string().required('Please enter the password to login')
    }),
    handleSubmit: (values, { setSubmitting }) => {
        console.log('Login attempted', values);
        // this.props.login(values.email, values.password);
    }
})(Login));