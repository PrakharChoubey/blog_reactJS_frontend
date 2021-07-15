import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Dashboard extends Component{
    render(){
        return(
        <h1>You r logged in with token:{this.props.auth.token}</h1>
        )
    }
}

const mapStatesToProps= state=>{
    return{
        auth:state.auth
    }
}

const mapDispatchToprops=dispatch=>{
    return{}
}

export default connect(
    mapStatesToProps,
    mapDispatchToprops
)(withRouter(Dashboard))