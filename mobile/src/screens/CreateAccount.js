import React, { Component } from 'react';
import { Text } from 'react-native';

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
            <Text>CreateAccount</Text>
        );
    }
}