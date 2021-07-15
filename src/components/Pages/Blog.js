import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link as RouterLink } from 'react-router-dom';
import Header from '../Common/Header';
import Image from '../assets/img/about.jpg';
import * as SiteActions from '../../store/actions/siteActions';
import BlogItem from './BlogItem';



class Blog extends Component {

    componentDidMount() {
        this.props.getPosts(0);
        this.props.getPostCount();
    }
    render() {
        return (
            <div>
                <Header
                    title='Blog'
                    subtitle="All of our stories"
                    showBtn={false}
                    image={Image}
                />
                <section className="page-section bg-light" id="portfolio">
                    <div className="container">
                        <div className="text-center">
                            <h2 className="section-heading text-uppercase">Portfolio</h2>
                            <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                        </div>
                        <div className="row">
                            {this.props.site.posts ?
                                this.props.site.posts.length > 0 ?
                                    this.props.site.posts.map((post, i) => {
                                        return (
                                            <BlogItem
                                                post={post}
                                                key={i} />
                                        )
                                    })
                                    : null
                                : null}
                        </div>
                        <div className='row'>
                            <div className='col-md-12'>
                                <div className='text-center'>
                                    {this.props.site.postCount > this.props.site.postCount.length ?
                                        <button className='btn btn-default' onClick={e => {
                                            this.props.getPosts(this.props.site.posts.length);
                                        }}>Load More</button> : null}
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        )
    }
}
const mapStateToProps = state => ({
    site: state.site
})
const mapDispatchToProps = dispatch => ({
    getPosts: (skip) => {
        dispatch(SiteActions.getPosts(skip));
    },
    getPostCount: () => {
        dispatch(SiteActions.getPostCount())
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(Blog));