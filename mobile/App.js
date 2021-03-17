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
            persist: false,
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.persist = this.persist.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    async componentDidMount() {
        console.log('component did mount')
        const token = await this.getToken();
        console.log('setting state to: ' + token);
        this.setState({ isLoggedIn: token });
    }

    persist() {
        console.log('pressed');
        this.setState({ persist: !this.state.persist });
    }

    async login() {
        if (this.state.persist) {
            // AsyncStorage method to create token???
            console.log('persist');
            try {
                await AsyncStorage.setItem('loginToken', JSON.stringify(true));
            } catch (error) {
                console.log('setToken error: ' + e);
            }
        }

        this.setState({ isLoggedIn: true });
    }

    async logout() {
        console.log('logout');
        // AsyncStorage method to remove token???
        try {
            await AsyncStorage.removeItem('loginToken');
        } catch (error) {
            console.log('setToken error: ' + e);
        }
        this.setState({ isLoggedIn: false });
    }

    async getToken() {
        //retrieve user token from storage if (exists) and set this.state.isLoggedIn appropriately
        try {
            const loginToken = await AsyncStorage.getItem('loginToken');
            console.log('token is: ' + loginToken);
            const tokenValue = await JSON.parse(loginToken);
            return loginToken != null;
            //return tokenValue
        } catch (error) {
            console.log('getToken error:' + error);
        }

    }

    render() {
        console.log('isLoggedIn: ' + this.state.isLoggedIn);
        if (!this.state.isLoggedIn) {
            return (
                <LoginStackNavigator login={this.login} persist={this.persist}/>
            );
        }
        else {
            return (
                <DashboardStackNavigator logout={this.logout}/>
            );
        }
    }
}