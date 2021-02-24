import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

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
            <ScrollView style={styles.loginContainer} centerContent={true}>
                <View>
                    <TextBox
                        placeholder='Username'
                    />
                    <TextBox
                        placeholder='Password'
                    />
                    <Button 
                        buttonText='Login'
                        onPress={this.props.login}
                    />
                    <Button
                        buttonText='Create Account'
                        onPress={() => this.props.navigation.navigate('CreateAccount')}
                    />
                </View>
            </ScrollView>
        );
    }
}