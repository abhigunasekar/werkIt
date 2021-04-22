import React, { Component } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';
import PasswordBox from '../components/PasswordBox';

import { mismatchPasswordAlert, invalidFormAlert, usernameDoesNotExist, invalidEmailCredentials, enterCodeError, invalidCode } from '../components/Alerts';
import * as serverMethods from '../ServerMethods';
import styles from '../light';

export default class ChangePassword extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            email: '',
            newPassword: '',
            matchingCredentials: false,
            passwordChanged: false,
            confirmation: false,
            valid: false,
            code: ''
        }

        this.checkUsername = this.checkUsername.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.validForm = this.validForm.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.checkCode = this.checkCode.bind(this);
    }

    async checkUsername() {
        if ((this.state.username !== '') && (this.state.email !== '')) {
            let usernameResponse = await serverMethods.verifyUsername(this.state.username);
            //let emailResponse = await serverMethods.verifyEmail(this.state.email);
            console.log(usernameResponse.status);
            //console.log(emailResponse.status);
            if ((usernameResponse.status === 200) /*&& (emailResponse.status === 200)*/) {
                this.setState({ matchingCredentials: true });
            } else {
                if (usernameResponse !== 200) {
                    usernameDoesNotExist();
                } else {
                    //emailDoesNotExist();
                }
            }
        } else {
            invalidFormAlert();
        }
    }

    async sendEmail() {
        if ((this.state.username !== '') && (this.state.email !== '')) {
            var body = {email: this.state.email};
            let emailRes = await serverMethods.sendEmail(this.state.username, body);
            console.log(emailRes.status);
            if ((emailRes.status === 200)) {
                this.setState({ matchingCredentials: true });
            } else {
                invalidEmailCredentials();
            }
        } else {
            invalidFormAlert();
        }
    }

    async checkCode() {
        if (this.state.code !== '') {
            var body = {code: parseInt(this.state.code, 10)}
            var codeRes = await serverMethods.checkCode(this.state.username, body);
            console.log(codeRes.status);
            if (codeRes.status === 200) {
                this.setState({ confirmation: true});
            } else {
                invalidCode();
            }
        } else {
            enterCodeError();
        }
    }

    passwordHandler(e) {
        if (e.nativeEvent.text !== this.state.newPassword) {
            console.log('passwords do not match');
            mismatchPasswordAlert();
        } else {
            this.setState({ valid: true });
        }
    }

    render() {
        //do this part in steps
        //i.e. this.state.step1
        // this.state.step1 && this.state.step2
        if (!this.state.matchingCredentials) {
            return (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.changePasswordContainer}>
                        <View style={styles.changePasswordForm}>
                            <Text style={styles.changePasswordText}>Change Password</Text>
                            <TextBox
                                placeholder='Username'
                                onChangeText={(text) => this.setState({ username: text })}
                                value={this.state.username}
                            />
                            <TextBox
                                placeholder='Email'
                                onChangeText={(text) => this.setState({ email: text })}
                                value={this.state.email}
                            />
                            <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Button 
                                buttonText='Go back'
                                onPress={() => this.props.navigation.navigate('Login')}
                                style={{marginRight: 45}}
                                purple={true}
                            /> 
                            <Button
                                buttonText='Next'
                                onPress={() => this.sendEmail()}
                                gray={true}
                            />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else if (!this.state.confirmation) {
            return (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.changePasswordContainer}>
                        <View style={styles.changePasswordForm}>
                            <Text style={{fontSize: 16, color: '#535c68', fontWeight: 'bold', marginBottom: 50}}>Check your email for a 6-digit confirmation code</Text>
                            <TextBox
                                placeholder='6-digit code'
                                onChangeText={(text) => this.setState({ code: text })}
                                value={this.state.code}
                            />
                            <View style={{flexDirection: 'row', marginTop: 30}}>
                            <Button 
                                buttonText='Go back'
                                onPress={() => this.props.navigation.navigate('Login')}
                                style={{marginRight: 45}}
                                purple={true}
                            /> 
                            <Button
                                buttonText='Next'
                                onPress={() => this.checkCode()}
                                gray={true}
                            />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else if (!this.state.passwordChanged) {
            return (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.changePasswordContainer}>
                        <View style={styles.changePasswordForm}>
                            <Text style={styles.changePasswordText}>Change Password</Text>
                            <PasswordBox
                                placeholder='New Password'
                                onChangeText={(text) => this.setState({ newPassword: text })}
                                //secureTextEntry={true}
                                value={this.state.newPassword}
                            />
                            <PasswordBox
                                placeholder="Confirm Password"
                                onEndEditing={(e) =>  this.passwordHandler(e)}
                                //secureTextEntry={true}
                            />
                            <Button
                                buttonText='Reset Password'
                                onPress={async () => {
                                    if (this.state.valid) {
                                        console.log('New password: ' + this.state.newPassword);
                                        let response = await serverMethods.changePassword({ username: this.state.username, newPassword: this.state.newPassword });
                                        if (response.status === 200) {
                                            this.setState({ passwordChanged: true });
                                        }
                                    } else {
                                        invalidFormAlert();
                                    }
                                }}
                                style={{ marginTop: 15 }}
                                gray={true}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.changePasswordContainer}>
                        <View style={styles.changePasswordForm}>
                            <Text>Your password has been successfully reset!</Text>
                            <Button
                                buttonText='Return to login'
                                onPress={() => this.props.navigation.navigate('Login')}
                                style={{ marginTop: 15 }}
                                gray={true}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            );
        }
    }
}