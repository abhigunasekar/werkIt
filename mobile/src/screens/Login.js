import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';
import TouchID from 'react-native-touch-id';
import * as LocalAuthentication from 'expo-local-authentication';


import Button from '../components/Button';
import TextBox from '../components/TextBox';
import PasswordBox from '../components/PasswordBox';

import { invalidCredentialsAlert, invalidFormAlert } from '../components/Alerts';
import * as serverMethods from '../ServerMethods';
import styles from '../styles';

//https://docs.expo.io/versions/latest/sdk/local-authentication/

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            persist: false,
        };

        this.checkCompatibility = this.checkCompatibility.bind(this);
        this.checkBiometrics = this.checkBiometrics.bind(this);
        this.touchID = this.touchID.bind(this);
        this.validForm = this.validForm.bind(this);
    }

    componentDidMount() {
        this.checkCompatibility();
        this.checkBiometrics();
        //this.touchID();
    }

    async checkCompatibility() {
        let compatible = await LocalAuthentication.hasHardwareAsync();
        if (compatible) {
            console.log('Combatible');
        } else {
            console.log('combatibility error');
        }
    }

    async checkBiometrics() {
        let records = await LocalAuthentication.isEnrolledAsync();
        if (records) {
            console.log('Has records');
        } else {
            console.log('biometrics error')
        }
    }

    async touchID() {
        let result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
            this.props.login();
        } else {
            console.log('TouchID failed')
        }
    }

    validForm() {
        return ((this.state.username !== '') && (this.state.password !== ''));
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.loginContainer}>
                    <View style={styles.loginForm}>
                        <Text style={styles.loginText}>Log in</Text>
                        <TextBox
                            placeholder='Username'
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username}
                        />
                        <PasswordBox
                            placeholder='Password'
                            onChangeText={(text) => this.setState({ password: text })}
                            //secureTextEntry={true}
                            value={this.state.password}
                        />
                        {/* Add a checkbox for "Keep me signed in" that sets this.state.persist: true */}
                        <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 20}}>
                            <Text onPress={() => this.props.navigation.navigate('CreateAccount')} style={{ color: '#FB963C', marginRight: 15 }}>Create Account</Text>
                            <Text onPress={() => this.props.navigation.navigate('ChangePassword')} style={{ color: '#535c68' }}>Forgot Password?</Text>
                        </View>
                        <Button 
                            buttonText='Login'
                            onPress={async () => {
                                if (this.validForm()) {
                                    console.log('Username: ' + this.state.username);
                                    console.log('Password: ' + this.state.password);
                                    let response = await serverMethods.login(this.state);
                                    if (response.status === 200) {
                                        this.props.login(this.state.persist);
                                    } else {
                                        invalidCredentialsAlert();
                                    }
                                } else {
                                    console.log('field is empty');
                                    invalidFormAlert();
                                }
                            }}
                            purple={true}
                        />
                        <Button
                            buttonText='Testing'
                            onPress={() => this.props.login()}
                            gray={true}
                        />
                        <Button
                            buttonText='Test touchid'
                            onPress={() => this.touchID()}
                            gray={true}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}