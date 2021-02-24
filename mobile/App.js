import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import LoginStackNavigator from './src/LoginStackNavigator';
import DashboardStackNavigator from './src/DashboardStackNavigator';
import Login from './src/screens/Login';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoggedIn: false,
        };

        this.login = this.login.bind(this);
    }

    login() {
        this.setState({ isLoggedIn: true });
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <LoginStackNavigator login={this.login}/>
            );
        }
        else {
            return (
                <DashboardStackNavigator />
            );
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
