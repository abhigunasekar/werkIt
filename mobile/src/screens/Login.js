import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

import { invalidCredentialsAlert, invalidFormAlert } from '../components/Alerts';
import * as serverMethods from '../ServerMethods';
import styles from '../styles';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };

        this.validForm = this.validForm.bind(this);
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
                        <TextBox
                            placeholder='Password'
                            onChangeText={(text) => this.setState({ password: text })}
                            secureTextEntry={true}
                            value={this.state.password}
                        />
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
                                        this.props.login();
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