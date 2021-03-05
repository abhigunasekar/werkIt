import React, { Component } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

import styles from '../styles';

export default class ChangePassword extends Component {
    constructor() {
        super();

        this.state = {
            oldPassword: '',
            newPassword: '',
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.changePasswordContainer}>
                    <View style={styles.changePasswordForm}>
                        <TextBox
                            placeholder='Old Password'
                            secureTextEntry={true}
                            value={this.state.oldPassword}
                        />
                        <TextBox
                            placeholder='New Password'
                            secureTextEntry={true}
                            value={this.state.newPassword}
                        />
                        <Button
                            buttonText='Reset Password'
                            onPress={() => {
                                console.log('New password: ' + this.state.newPassword);
                                this.props.navigation.navigate('Login');
                            }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}