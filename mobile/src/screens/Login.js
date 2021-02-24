import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

import styles from '../styles';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <View style={styles.loginContainer}>
                <View style={styles.loginForm}>
                    <TextBox
                        placeholder='Username'
                    />
                    <TextBox
                        placeholder='Password'
                    />
                    <Text onPress={() => this.props.navigation.navigate('CreateAccount')} style={{ marginBottom: 10, color: '#7641BD'}}>Create Account</Text>
                    <Button 
                        buttonText='Login'
                        onPress={this.props.login}
                    />
                </View>
            </View>
        );
    }
}