import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Text, KeyboardAvoidingView } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';
import PasswordBox from '../components/PasswordBox';

import * as serverMethods from '../ServerMethods';
import styles from '../styles';

import { invalidEmailAlert, mismatchPasswordAlert, invalidFormAlert, usernameAlreadyExists } from '../components/Alerts';

export default class CreateAccount extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            emailError: false,
            usernameError: false,
        };

        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.validForm = this.validForm.bind(this);
    }

    emailHandler(e) {
        if (!e.nativeEvent.text.includes('@')) {
            console.log('invalid email');
            this.setState({ emailError: true });
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
                            onChangeText={(text) => this.setState({ email: text, emailError: false })}
                            style={this.state.emailError ? styles.errorBox : ''}
                            onEndEditing={(e) => this.emailHandler(e)}
                            value={this.state.email}
                        />
                        <TextBox
                            placeholder='Username'
                            onChangeText={(text) => this.setState({ username: text, usernameError: false })}
                            style={this.state.usernameError ? styles.errorBox : ''}
                            value={this.state.username}
                        />
                        <PasswordBox
                            placeholder='Password'
                            onChangeText={(text) => this.setState({ password: text })}
                            //secureTextEntry={true}
                            value={this.state.password}
                        />
                        <PasswordBox
                            placeholder="Confirm Password"
                            onEndEditing={(e) =>  this.passwordHandler(e)}
                            //secureTextEntry={true}
                        />
                        <View style={{flexDirection: 'row', marginTop: 17}}>
                            <Button 
                                buttonText='Go back'
                                onPress={() => this.props.navigation.navigate('Login')}
                                style={{marginRight: 30}}
                                purple={true}
                            /> 
                            <Button 
                                buttonText='Sign up'
                                onPress={async () => {
                                    if (this.validForm()) {
                                        //maybe add a confirmation alert here??
                                        let response = await serverMethods.createAccount({ firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, username: this.state.username, password: this.state.password});
                                        if (response.status === 200) {
                                            //this.props.navigation.navigate('Dashboard');
                                            this.props.login(this.state.username);
                                        } else {
                                            // add parsing for spaces at the end of string
                                            usernameAlreadyExists();
                                            this.setState({usernameError: true});
                                        }  
                                    } else {
                                        console.log('field is empty');
                                        invalidFormAlert();
                                    }
                                }}
                                orange={true}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}