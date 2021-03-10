import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Text, KeyboardAvoidingView } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

import * as serverMethods from '../ServerMethods';
import styles from '../styles';

import { invalidEmailAlert, mismatchPasswordAlert, invalidFormAlert } from '../components/Alerts';

export default class CreateAccount extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            correctEmail: true,
        };

        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.validForm = this.validForm.bind(this);
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

    validForm() {
        return ((this.state.firstName !== '') && (this.state.lastName !== '') && ((this.state.email !== '') && (this.state.email.includes('@'))) && (this.state.username !== '') && (this.state.password !== ''));
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
                            autoFocus={!this.state.correctEmail}
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
                            onPress={async () => {
                                if (this.validForm()) {
                                    //maybe add a confirmation alert here??
                                    await serverMethods.createAccount({ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, username: this.state.username, passsword: this.state.password});
                                    this.props.navigation.navigate('Login');    
                                } else {
                                    console.log('field is empty');
                                    invalidFormAlert();
                                }
                            }}
                            style={{ marginTop: 10 }}
                            orange={true}
                        />
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}