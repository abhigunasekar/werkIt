import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';

import Button from '../components/Button';
//import DismissKeyboard from '../components/DismissKeyboard';
import TextBox from '../components/TextBox';

import styles from '../styles';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.loginContainer}>
                    <View style={styles.loginForm}>
                        <Text style={styles.loginText}>Sign in</Text>
                        <TextBox
                            placeholder='Username'
                            onChangeText={(text) => this.setState({ username: text })}
                            value={this.state.username}
                        />
                        <TextBox
                            placeholder='Password'
                            onChangeText={(text) => this.setState({ password: text })}
                            value={this.state.password}
                        />
                        <Text onPress={() => this.props.navigation.navigate('CreateAccount')} style={{ marginTop: 5, marginBottom: 20, color: '#FB963C' }}>Create Account</Text>
                        <Button 
                            buttonText='Login'
                            onPress={() => {
                                console.log('Username: ' + this.state.username);
                                console.log('Password: ' + this.state.password);
                                this.props.login();
                            }}
                            style={{ borderColor: '#7641BD' }}
                            purple={true}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}