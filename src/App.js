import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import Home from './Containers/Home';
import Users from './Containers/Users';
import User from './Containers/User';
import Login from './Containers/Login';
import Loader from './Components/Loader';

const PrivateRoute = ({ path, component: Component, ...rest }) => {
    const isLogged = localStorage.getItem('isLogged')
    return (
        <Route path={path} {...rest} render={props => {
            if (isLogged) {
                return <Component {...props} {...rest} />
            }
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }} />
    )
}

class App extends Component {
    handleLogout = () => {
        this.props.logout();
    }
    render() {
        return (
            <Router>
                <div className="app">
                    <nav className="toolbar">
                        <Link className="logo" to="/">React Redux Site Example</Link>
                        <ul className="menu">
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to="/users">Users</NavLink></li>
                            <li><NavLink to="/user/1">User Number 1</NavLink></li>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><Link to="/login" onClick={this.handleLogout}>Logout</Link></li>
                        </ul>
                    </nav>

                    <main>
                        {(this.props.isLoaderActive === true)?<Loader />:null}
                        <PrivateRoute path="/" exact component={Home} />
                        <PrivateRoute path="/users/:pageNumber?" component={Users} />
                        <PrivateRoute path="/user/:userID"  component={User} />
                        <Route path="/login" component={Login} />
                    </main>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoaderActive: state.isLoaderActive
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout() {
            dispatch({type: 'SET_LOGGED_OUT'});
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);