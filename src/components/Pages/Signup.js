import React, { Component } from 'react';
import Field from '../Common/Field';
import { withFormik, validateYupSchema } from 'formik';
import { connect } from 'react-redux'
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions'

const fields = [
    { name: 'email', ename: 'input', type: 'email', placeholder: 'Your Email' },
    { name: 'name', ename: 'input', type: 'text', placeholder: 'Your Name' },
    { name: 'password', ename: 'input', type: 'password', placeholder: 'Your Password' },
    { name: 'password2', ename: 'input', type: 'password', placeholder: 'Your Password (Again)' }]

class Signup extends Component {
    render() {
        return (
            <div className="login-page">
                <div className='container'>
                    <div className="login-form">
                        <div className="row">
                            <h1>SIGN UP</h1>
                        </div>
                        <div className="row">
                            <form className="row"
                                onSubmit={e => {
                                    e.preventDefault();
                                    this.props.register(this.props.values.name, this.props.values.email, this.props.values.password);
                                }}>
                                {fields.map((f, i) => {
                                    return (
                                        <div className="col-md-6">
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
                            <p className="text-danger text-center">{this.props.auth.error || ""}</p>
                                    <button className="btn btn-primary" type="submit">Sign up</button>
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
        register: (name, email, password) => {
            console.log('Registering in.......', email);
            dispatch(AuthActions.register(name, email, password))
        }
    }
}

export default connect(
    mapStatesToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: () => ({
        email: '',
        name: '',
        password: '',
        password2: ''
    }), validationSchema: Yup.object().shape({
        name: Yup.string().required('We need your name'),
        email: Yup.string().email('Not a valid email').required('You need to login with an email address'),
        password: Yup.string().min(8, 'Password needs to be atleast 8 characters long').required('Please enter the password to login'),
        password2: Yup.string().required('You need to enter your password again').test('pass-match', 'passwords don\'t match', function (value) {
            const { password } = this.parent;
            return password === value;
        })
    }),
    handleSubmit: (values, { setSubmitting }) => {
        console.log('Login attempted', values);
        // this.props.login(values.email, values.password);
    }
})(Signup));