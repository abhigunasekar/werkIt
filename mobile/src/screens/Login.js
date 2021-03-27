import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
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
            touchID: false,
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
            this.setState({ touchID: true });
        } else {
            console.log('combatibility error');
            this.setState({ touchID: false });
        }
    }

    async checkBiometrics() {
        let records = await LocalAuthentication.isEnrolledAsync();
        if (records) {
            console.log('Has records');
            this.setState({ touchID: true });
        } else {
            console.log('biometrics error')
            this.setState({ touchID: false });
        }
    }

    async touchID() {
        let result = await LocalAuthentication.authenticateAsync();
        if (result.success) {
            if (this.state.persist) {
                this.props.persist();
            }
            this.props.login(this.state.username);
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
                        <Text style={styles.loginText}>Werk It</Text>
                        <TextBox
                            placeholder='Username'
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username}
                        />
                        <PasswordBox
                            placeholder='Password'
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                            biometric={() => this.touchID()}
                        />
                        <CheckBox
                            title='Keep me signed in'
                            checked={this.state.persist}
                            containerStyle={{
                                alignSelf: 'left',
                                marginLeft: 25,
                                marginTop: -10,
                                backgroundColor: '#FFFFFF',
                                borderColor: '#FFFFFF'
                            }}
                            onPress={() => this.setState({ persist: !this.state.persist })}
                        />
                        <Button 
                            buttonText='Login'
                            onPress={async () => {
                                if (this.validForm()) {
                                    console.log('Username: ' + this.state.username);
                                    console.log('Password: ' + this.state.password);
                                    let response = await serverMethods.login(this.state);
                                    if (response.status === 200) {
                                        if (this.state.persist) {
                                            this.props.persist();
                                        }
                                        this.props.login(this.state.username);
                                    } else {
                                        invalidCredentialsAlert();
                                    }
                                } else {
                                    console.log('field is empty');
                                    invalidFormAlert();
                                }
                            }}
                            style={{marginTop: 10, width: 150}}
                            purple={true}
                        />
                        {/* Add a checkbox for "Keep me signed in" that sets this.state.persist: true */}
                        <View style={{flexDirection: 'row', marginTop: 30}}>
                            <Text onPress={() => this.props.navigation.navigate('CreateAccount')} style={{ color: '#FB963C', marginRight: 15 }}>Create Account</Text>
                            <Text onPress={() => this.props.navigation.navigate('ChangePassword')} style={{ color: '#535c68' }}>Forgot Password?</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}