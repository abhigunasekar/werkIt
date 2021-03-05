import React, { Component } from 'react';

import LoginStackNavigator from './src/LoginStackNavigator';
import DashboardStackNavigator from './src/DashboardStackNavigator';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoggedIn: false,
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    login() {
        this.setState({ isLoggedIn: true });
    }

    logout() {
        this.setState({ isLoggedIn: false });
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <LoginStackNavigator login={this.login}/>
            );
        }
        else {
            return (
                <DashboardStackNavigator logout={this.logout}/>
            );
        }
    }
}