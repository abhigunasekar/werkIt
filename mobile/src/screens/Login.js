import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';
import TouchID from 'react-native-touch-id';

import Button from '../components/Button';
import TextBox from '../components/TextBox';
import PasswordBox from '../components/PasswordBox';

import { invalidCredentialsAlert, invalidFormAlert } from '../components/Alerts';
import * as serverMethods from '../ServerMethods';
import styles from '../styles';

//https://www.npmjs.com/package/react-native-touch-id

TouchID.isSupported({unifiedErrors: false, passcodeFallback: false})
    .then(biometryType => {
        if (biometryType === 'FaceID') {
            console.log('FaceID is supported.');
        } else {
            console.log('TouchID is supported.');
        }
    })
    .catch(error => console.log(error));

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            persist: false,
        };

        this.validForm = this.validForm.bind(this);
        this.onPress = this.onPress.bind(this);
    }

    validForm() {
        return ((this.state.username !== '') && (this.state.password !== ''));
    }

    onPress() {
        TouchID.authenticate('to login')
        .then(success => console.log('Success'))
        .catch(error => console.log('error'));
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
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}