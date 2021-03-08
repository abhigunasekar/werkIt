import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

import styles from '../styles';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errUsername: 'Username',
            errUsernameStyle: 'textBox',
            errPassword: 'Password',
            errPasswordStyle: 'textBox',
        };

        this.opError = this.opError.bind(this);
    }

    opError(errorString) {

        // Add Code for when the email, username, or password already exist for a user in the database

        if (errorString === "Test") {
            this.setState({errUsername : 'Error: Username is wrong! Please try again:'});
            this.setState({errUsernameStyle : 'textBoxErr'});
        }
        
        if (errorString === "Test") {
            this.setState({errPassword : 'Error: Password is wrong! Please try again:'});
            this.setState({errPasswordStyle : 'textBoxErr'});
        }
    };

    render() {
        return (
            <View style={styles.loginContainer}>
                <View style={styles.loginForm}>
                    <TextBox
                        placeholder={this.state.errUsername}
                        onChangeText={(text) => this.setState({ username: text })}
                        value={this.state.username}
                        // style={styles.textBox}
                        style={styles[this.state.errUsernameStyle]}
                    />
                    <TextBox
                        placeholder={this.state.errPassword}
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        // style={styles.textBox}
                        style={styles[this.state.errPasswordStyle]}
                    />
                    <Text onPress={() => this.props.navigation.navigate('CreateAccount')} style={{ marginBottom: 10, color: '#7641BD'}}>Create Account</Text>
                    <Button 
                        buttonText='Login'
                        onPress={() => {
                            console.log('Username: ' + this.state.username);
                            console.log('Password: ' + this.state.password);
                            this.props.login();
                        }}
                    />
                    <Button
                        buttonText='Dev: Test Error Messages'
                        onPress={() => this.opError("Test")}
                    />
                </View>
            </View>
        );
    }
}