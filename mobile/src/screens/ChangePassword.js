import React, { Component } from 'react';
import { Text, View, Keyboard, TouchableWithoutFeedback } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

import { mismatchPasswordAlert } from '../components/Alerts';
import * as serverMethods from '../ServerMethods';
import styles from '../styles';

export default class ChangePassword extends Component {
    constructor() {
        super();

        this.state = {
            username: '',
            newPassword: '',
            matchingUsername: false,
            passwordChanged: false,
        }

        this.checkUsername = this.checkUsername.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
    }

    checkUsername(e) {
        //server request to validate username
        /* if (error) {
            throw an error
        } */
        this.setState({ matchingUsername: true });
    }

    passwordHandler(e) {
        if (e.nativeEvent.text !== this.state.newPassword) {
            console.log('passwords do not match');
            mismatchPasswordAlert();
        }
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
                            <Button
                                buttonText='Next'
                                onPress={() => this.checkUsername()}
                                style={{ marginTop: 15 }}
                                gray={true}
                            />
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
                                    console.log('New password: ' + this.state.newPassword);
                                    await serverMethods.changePassword({ username: this.state.username, newPassword: this.state.newPassword });
                                    this.setState({ passwordChanged: true });
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