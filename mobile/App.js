import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './src/StackNavigator';
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
                <Login
                     login={this.login}
                />
            );
        }
        else {
            return (
                <StackNavigator />
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
