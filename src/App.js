import logo from './logo.svg';
import './App.css';
import PageWrapper from './components/PageWrapper'
import { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


import Home from './components/Pages/Home';
import About from './components/Pages/About';
import Services from './components/Pages/Services';
import Portfolio from './components/Pages/Portfolio';
import Contact from './components/Pages/Contact';
import Contact_formik from './components/Pages/Contact_formik';
import Login from './components/Pages/Login';
import Blog from './components/Pages/Blog';
import Single from './components/Pages/Single';


import LoginWrapper from './components/LoginWrapper'
import AdminWrapper from './components/AdminWrapper';
import Dashboard from './components/Pages/Admin/Dashboard';
import Users from './components/Pages/Admin/Users';
import Posts from './components/Pages/Admin/Posts';
import AddPost from './components/Pages/Admin/AddPost';
import Signup from './components/Pages/Signup';


class App extends Component {
  render() {

    return (
      <Router>
        <Route
          path="/admin/users"
          render={props => {
            console.log('propss', props);
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <Users />
                  </AdminWrapper>
                  :
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                }
              </div>
            )
          }}
        />
        <Route
          path='/admin/posts/:view/:id'
          exact={true}
          render={props => {
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <AddPost />
                  </AdminWrapper>
                  :
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                }
              </div>
            )
          }}
        />
        <Route
          path='/admin/posts/:view'
          exact={true}
          render={props => {
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <AddPost />
                  </AdminWrapper>
                  :
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                }
              </div>
            )
          }}
        />
        <Route
          path="/admin/posts"
          exact={true}
          render={props => {
            console.log('propss', props);
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <Posts />
                  </AdminWrapper>
                  :
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                }
              </div>
            )
          }}
        />

        <Route
          exact={true}
          path="/signup"
          render={props=>{
            if(this.props.auth.token){
              return(
                <Redirect to="/"/>
              )
            }
            else{
              return(<LoginWrapper>
                <Signup/>
              </LoginWrapper>)
            }
          }}
        />

        <Route
          exact={true}
          path='/admin'
          render={props => {
            return (
              <div>
                {this.props.auth.token ?
                  <AdminWrapper>
                    <Dashboard />
                  </AdminWrapper>
                  :
                  <LoginWrapper>
                    <Login />
                  </LoginWrapper>
                }
              </div>

            )
          }}
        />
        <Route
          exact={true}
          path='/'
          render={props => (
            <PageWrapper>
              <Home {...props} />
            </PageWrapper>
          )}
        />
        <Route
          path='/blog/:slug'
          exact={true}
          render={props => (
          <PageWrapper>
            <Single {...props} />
          </PageWrapper>
        )}
        />
        <Route
          path='/blog'
          exact={true}
          render={props => (
            <PageWrapper>
              <Blog {...props} />
            </PageWrapper>
          )}
        />
        <Route
          path='/about'
          render={props => (
            <PageWrapper>
              <About {...props} />
            </PageWrapper>
          )}
        />
        <Route
          path='/services'
          render={props => (
            <PageWrapper>
              <Services {...props} />
            </PageWrapper>
          )}
        />
        <Route
          path='/portfolio'
          render={props => (
            <PageWrapper>
              <Portfolio {...props} />
            </PageWrapper>
          )}
        />
        <Route
          path='/contact'
          render={props => (
            <PageWrapper>
              <Contact_formik {...props} />
            </PageWrapper>
          )}
        />
      </Router>
    );
  }
}
const mapStatesToProps = state => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStatesToProps,
  mapDispatchToProps
)(App);
