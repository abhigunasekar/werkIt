import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
// reference this --> https://reactnative.dev/docs/asyncstorage

import MotivationalQuote from './src/screens/MotivationalQuote';
import LoginStackNavigator from './src/stackNavigators/LoginStackNavigator';
import DrawerNavigator from './src/DrawerNavigator';

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
        this.getQuote = this.getQuote.bind(this);
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

        this.setState({ isLoggedIn: true, username: user });
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
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log('getToken error:' + error);
        }
    }

    async getQuote() {
        const proxyUrl = 'https://desolate-inlet-19096.herokuapp.com/'
        const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data['quoteText'];
            // console.log(data);
            // If Author is blank, add 'Unknown'
            // if (data.quoteAuthor === '') {
            //     authorText.innerText = 'Unknown';
            // } else {
            //     authorText.innerText = data.quoteAuthor;
            // }
            // Reduce font size for long quotes
            /* if (data.quoteText.length > 120) {
                quoteText.classList.add('long-quote');
            } else {
                quoteText.classList.remove('long-quote');
            } */
            // quoteText.innerText = data;
            // this.setState({ quote: data['quoteText'] });
            // this.setState({ quoteWait: false });
            // Stop loader and show quot
        } catch (error) {
            console.log(error);
        }

        
    }

    render() {

        // pass style down based on preference
        if (!this.state.isLoaded) {
            const resultq = this.getQuote();
            // console.log(this.state.quote);
            return (
                <MotivationalQuote quote={resultq}/>
            );
        } else {
            if (!this.state.isLoggedIn) {
                return (
                    <LoginStackNavigator login={this.login} persist={this.persist} logout={this.logout}/>
                );
            }
            else {
                return (
                    <DrawerNavigator logout={this.logout} username={this.state.username} darkmode={this.state.darkmode}/>
                );
            }
        }
    }
}