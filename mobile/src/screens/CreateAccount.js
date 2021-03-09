import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Text, KeyboardAvoidingView } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';
import styles from '../styles';

import { invalidEmailAlert, mismatchPasswordAlert } from '../components/Alerts';

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

        this.passwordHandler = this.passwordHandler.bind(this);
    }

    emailHandler(e) {
        if (!e.nativeEvent.text.includes('@')) {
            console.log('invalid email');
            invalidEmailAlert();
        }
    }

    passwordHandler(e) {
        if (e.nativeEvent.text !== this.state.password) {
            console.log('passwords do not match');
            mismatchPasswordAlert();
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.createAccountContainer}>
                    <KeyboardAvoidingView style={styles.createAccountForm} behavior='padding'>
                        <Text style={styles.createAccountText}>Create Account</Text>
                        <TextBox
                            placeholder='First Name'
                            onChangeText={(text) => this.setState({ firstName: text })}
                            value={this.state.firstName}
                        />
                        <TextBox
                            placeholder='Last Name'
                            onChangeText={(text) => this.setState({ lastName: text })}
                            value={this.state.lastName}
                        />
                        <TextBox 
                            placeholder='Email'
                            keyboardType='email-address'
                            onChangeText={(text) => this.setState({ email: text })}
                            onEndEditing={(e) => this.emailHandler(e)}
                            value={this.state.email}
                        />
                        <TextBox
                            placeholder='Username'
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username}
                        />
                        <TextBox
                            placeholder='Password'
                            onChangeText={(text) => this.setState({ password: text })}
                            secureTextEntry={true}
                            value={this.state.password}
                        />
                        <TextBox
                            placeholder="Confirm Password"
                            onEndEditing={(e) =>  this.passwordHandler(e)}
                            secureTextEntry={true}
                        />
                        <Button 
                            buttonText='Sign up'
                            onPress={() => this.props.navigation.navigate('Login')}
                            style={{ marginTop: 10 }}
                            orange={true}
                        />
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}