import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// reference this --> https://reactnative.dev/docs/asyncstorage

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
        this.getToken = this.getToken.bind(this);
    }

    login() {
        if (this.state.persist) {
            // AsyncStorage method to create token???
        }

        this.setState({ isLoggedIn: true });
    }

    logout() {
        // AsyncStorage method to remove token???
        this.setState({ isLoggedIn: false });
    }

    async getToken() {
        // retrieve user token from storage if (exists) and set this.state.isLoggedIn appropriately
        // try {
        //     let userData = await AsyncStorage.getItem("userData");
        //     let data = JSON.parse(userData);
        //     console.log(data);
        // } catch (error) {
        //     console.log("Something went wrong", error);
        // }

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