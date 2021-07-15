import React, { Component } from 'react';
import Image from '../assets/img/services.jpg'
import Header from '../Common/Header'
import SingleService from './SingleService'

const services = [
    {
        title: 'E-Commerce',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.',
        icon: 'fas fa-shopping-cart'
    },
    {
        title: 'Responsive Design',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.',
        icon: 'fas fa-laptop'
    },
    {
        title: 'Web Security',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.',
        icon: 'fas fa-lock'
    }
];

class Services extends Component {
    render() {

        return (
            <div>
                <Header
                    title='Services'
                    subtitle="All about our services"
                    showBtn={false}
                    image={Image}
                />
                <section class="page-section" id="services">
                    <div class="container">
                        <div class="text-center">
                            <h2 class="section-heading text-uppercase">Services</h2>
                            <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                        <div class="row text-center">
                            {services.map((service, index) => {
                                return (<SingleService
                                    // title={service.title}
                                    // icon={service.icon}
                                    // desc={service.desc}
                                    {...service} key={index}
                                />)
                            })}
                        </div>
                    </div>
                </section>
            </div>
        )
    }

}

export default Services;