import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// reference this --> https://reactnative.dev/docs/asyncstorage

import MotivationalQuote from './src/screens/MotivationalQuote';
import LoginStackNavigator from './src/stackNavigators/LoginStackNavigator';
import DrawerNavigator from './src/DrawerNavigator';

import * as serverMethods from './src/ServerMethods';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoaded: false,
            isLoggedIn: false,
            persist: false,
            username: '',
            darkmode: true,
            quote: 'Unset',
            quoteWait: true,
        };

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.persist = this.persist.bind(this);
        this.getToken = this.getToken.bind(this);
        this.updateDarkmode = this.updateDarkmode.bind(this);
    }

    async componentDidMount() {
        const token = await this.getToken();
        this.setState({ isLoggedIn: token });
        setTimeout(() => this.setState({ isLoaded: true }), 4000);
    }

    persist() {
        console.log('persist')
        this.setState({ persist: !this.state.persist });
    }

    async login(user) {
        if (this.state.persist) {
            // AsyncStorage method to create token???
            try {
                console.log('tried to set token')
                await AsyncStorage.setItem('loginToken', user);
            } catch (error) {
                console.log('setToken error: ' + error);
            }
        }
        serverMethods.getUserField(user, "dark_mode")
                    .then(response => response.json())
                    .then(response => {
                        console.log('response is: ' + response)
                        this.setState({ darkmode: response.dark_mode, isLoggedIn: true, username: user })
                    });
        //this.setState({ isLoggedIn: true, username: user });
    }

    async logout() {
        // AsyncStorage method to remove token???
        try {
            console.log('tried to remove token')
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
                console.log('token is not null')
                this.setState({ username: loginToken });
                //server call for dark mode?
                serverMethods.getUserField(loginToken, "dark_mode")
                    .then(response => response.json())
                    .then(response => this.setState({ darkmode: response.dark_mode }));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log('getToken error:' + error);
        }
    }

    updateDarkmode() {
        this.setState({ darkmode: !this.state.darkmode });
        //maybe i don't need to force update?
        this.forceUpdate();
    }

    render() {

        // pass style down based on preference
        if (!this.state.isLoaded) {
            return (
                <MotivationalQuote />
            );
        } else {
            if (!this.state.isLoggedIn) {
                return (
                    <LoginStackNavigator login={this.login} persist={this.persist} logout={this.logout}/>
                );
            }
            else {
                return (
                    <DrawerNavigator logout={this.logout} username={this.state.username} darkmode={this.state.darkmode} updateDarkmode={this.updateDarkmode}/>
                );
            }
        }
    }
}