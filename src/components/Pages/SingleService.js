import React, { Component } from 'react';


class SingleService extends Component {
    render() {
        return (
            <div class="col-md-4">
                <span class="fa-stack fa-4x">
                    <i class="fas fa-circle fa-stack-2x text-primary"></i>
                    <i class={`fas ${this.props.icon} fa-stack-1x fa-inverse`}></i>
                </span>
                <h4 class="my-3">{this.props.title}</h4>
                <p class="text-muted">{this.props.desc}</p>
            </div>
        )
    }
}

export default SingleService;