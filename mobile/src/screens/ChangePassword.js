import React, { Component } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

import { mismatchPasswordAlert, invalidFormAlert, usernameDoesNotExist } from '../components/Alerts';
import * as serverMethods from '../ServerMethods';
import styles from '../styles';

export default class ChangePassword extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            email: '',
            newPassword: '',
            matchingUsername: false,
            passwordChanged: false,
        }

        this.checkUsername = this.checkUsername.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.validForm = this.validForm.bind(this);
    }

    async checkUsername() {
        if (this.state.username !== '') {
            let response = await serverMethods.verifyUsername(this.state.username);
            console.log(response.status);
            if (response.status === 200) {
                this.setState({ matchingUsername: true });
            } else {
                usernameDoesNotExist();
            }
        } else {
            invalidFormAlert();
        }

    }

    passwordHandler(e) {
        if (e.nativeEvent.text !== this.state.newPassword) {
            console.log('passwords do not match');
            mismatchPasswordAlert();
        }
    }

    validForm() {
        return (this.state.newPassword !== '');
    }

    render() {
        if (!this.state.matchingUsername) {
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
                                onPress={() => this.checkUsername()}
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
                            <TextBox
                                placeholder='New Password'
                                onChangeText={(text) => this.setState({ newPassword: text })}
                                secureTextEntry={true}
                                value={this.state.newPassword}
                            />
                            <TextBox
                                placeholder="Confirm Password"
                                onEndEditing={(e) =>  this.passwordHandler(e)}
                                secureTextEntry={true}
                            />
                            <Button
                                buttonText='Reset Password'
                                onPress={async () => {
                                    if (this.validForm()) {
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