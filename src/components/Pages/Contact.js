import React, { Component } from 'react';
import Field from '../Common/Field';


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

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            phone: '',
            email: '',
            message: ''
        }
    }
    render() {
        return (
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">222Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    <form id="contactForm" name="sentMessage" novalidate="novalidate">
                        <div className="row align-items-stretch mb-5">

                            {Fields.sections.map((sec, index) => {
                                return (
                                    <div className="col-md-6" key={index}>
                                        {sec.map((field, i) => {
                                            return (
                                                <Field
                                                    {...field}
                                                    key={i}
                                                    value={this.state[field.name]}
                                                    onChange={e => this.setState({
                                                        [field.name]: e.target.value
                                                    })}
                                                />
                                            )
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

export default Contact;