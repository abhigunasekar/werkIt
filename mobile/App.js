import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// reference this --> https://reactnative.dev/docs/asyncstorage

import MotivationalQuote from './src/screens/MotivationalQuote';
import LoginStackNavigator from './src/LoginStackNavigator';
import DrawerNavigator from './src/DrawerNavigator';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            persist: false,
            username: '',
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.persist = this.persist.bind(this);
        this.getToken = this.getToken.bind(this);
    }

    async componentDidMount() {
        const token = await this.getToken();
        this.setState({ isLoggedIn: token });
        setTimeout(() => this.setState({ isLoaded: true }), 5000);
    }

    persist() {
        this.setState({ persist: !this.state.persist });
    }

    async login(user) {
        if (this.state.persist) {
            // AsyncStorage method to create token???
            try {
                await AsyncStorage.setItem('loginToken', user);
            } catch (error) {
                console.log('setToken error: ' + error);
            }
        }

        this.setState({ isLoggedIn: true, username: user });
    }

    async logout() {
        // AsyncStorage method to remove token???
        try {
            await AsyncStorage.removeItem('loginToken');
        } catch (error) {
            console.log('setToken error: ' + error);
        }
        this.setState({ isLoggedIn: false });
    }

    async getToken() {
        //retrieve user token from storage if (exists) and set this.state.isLoggedIn appropriately
        try {
            const loginToken = await AsyncStorage.getItem('loginToken');
            if (loginToken != null) {
                this.setState({ username: loginToken });
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log('getToken error:' + error);
        }
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <MotivationalQuote />
            );
        } else {
            if (!this.state.isLoggedIn) {
                return (
                    <LoginStackNavigator login={this.login} persist={this.persist}/>
                );
            }
            else {
                return (
                    <DrawerNavigator logout={this.logout} username={this.state.username}/>
                );
            }
        }
    }
}