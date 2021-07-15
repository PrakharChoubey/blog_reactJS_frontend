import React, { Component } from 'react';
import Header from '../Common/Header'
import Image from '../assets/img/header-bg.jpg';
import Services from './Services';
import Portfolio from './Portfolio';
// import Image from '../assets/img/about.jpg';

class Home extends Component {
    render() {
        return (
            <div>
                <Header
                    title='Welcome To Our Studio!'
                    subtitle="It's Nice To Meet You"
                    showBtn={true}
                    link='/services'
                    btnText='tell me more'
                    image={Image}
                />
                <Services />
                <Portfolio />
            </div>
        )
    }
}
export default Home;