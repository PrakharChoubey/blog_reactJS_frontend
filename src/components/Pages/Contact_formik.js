import React, { Component } from 'react';
import Field from '../Common/Field';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const Fields = {
    sections: [
        [
            { name: 'name', ename: 'input', type: 'text', placeholder: 'Your Name' },
            { name: 'email', ename: 'input', type: 'email', placeholder: 'Your Email' },
            { name: 'phone', ename: 'input', type: 'text', placeholder: 'Your Phone Number' }
        ],
        [
            { name: 'message', ename: 'textarea', type: 'text', placeholder: 'Your Message' }
        ]
    ]
}

class Contact_formik extends Component {

    render() {
        return (
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <form onSubmit={this.props.handleSubmit} id="contactForm" name="sentMessage" novalidate="novalidate">
                        <div className="row align-items-stretch mb-5">
                            {Fields.sections.map((sec, sec_index) => {
                                return (
                                    <div className="col-md-6" key={sec_index}>
                                        {sec.map((field, i) => {
                                            return <Field
                                                {...field}
                                                key={i}
                                                value={this.props.values[field.name]}
                                                name={field.name}
                                                onChange={this.props.handleChange}
                                                onBlur={this.props.handleBlur}
                                                touched={(this.props.touched[field.name])}
                                                errors={this.props.errors[field.name]}
                                            />
                                        })}
                                    </div>
                                )
                            })}

                        </div>
                        <div className="text-center">
                            <div id="success"></div>
                            <button className="btn btn-primary btn-xl text-uppercase" id="sendMessageButton" type="submit">Send Message</button>
                        </div>
                    </form>
                </div>
            </section>
        )
    }

}

export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        phone: '',
        message: ''
    }),
    // validate: values => {
    //     const errors = {};
    //     Object.keys(values).map(v => {
    //         if (!values[v]) {
    //             errors[v] = "Required";
    //         }
    //     })
    //     return errors;
    // },
    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, 'come onn').required("REQ"),
        email: Yup.string().email('not a valid email').required('REQ'),
        phone: Yup.string().min(10, '10 digits req').max(14, 'too long').required('REQ')
    }),
    handleSubmit: (values, { setSubmitting }) => {
        console.log("Valuesss", values);
        console.log("json", JSON.stringify(values));
        alert("You've submitted", JSON.stringify(values));
    }
})(Contact_formik);