import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import Button from '../components/Button';

export default class CreateAccount extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <ScrollView>
                <Text>Create Account</Text>
                <Button 
                    buttonText='Sign up'
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </ScrollView>
        );
    }
}