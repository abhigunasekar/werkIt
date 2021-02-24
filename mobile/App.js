import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Dashboard from './src/screens/Dashboard';
import Login from './src/screens/Login';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoggedIn: false,
        }
    }

    render() {
        if (!this.state.isLoggedIn) {
            return (
                <Login />
            );
        }
        else {
            return (
                <Dashboard />
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
