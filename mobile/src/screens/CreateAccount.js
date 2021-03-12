import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Text, KeyboardAvoidingView } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

import styles from '../styles';

export default class CreateAccount extends Component {
    constructor() {
        super()

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            errEmail: 'Email',
            errEmailStyle: 'textBox',
            errUsername: 'Username',
            errUsernameStyle: 'textBox',
            errPassword: 'Password',
            errPasswordStyle: 'textBox',
        };

        this.opError = this.opError.bind(this);
    }

    // errorString = '';

    opError(errorString) {

        // Add Code for when the email, username, or password already exist for a user in the database

        if (errorString === "Test") {
            this.setState({errEmail : 'Error: Email in use! Please enter a different Email:'});
            this.setState({errEmailStyle : 'textBoxErr'});
        }
        
        if (errorString === "Test") {
            this.setState({errUsername : 'Error: Username in use! Please enter a different Username:'});
            this.setState({errUsernameStyle : 'textBoxErr'});
        }
        
        if (errorString === "Test") {
            this.setState({errPassword : 'Error: Password in use! Please enter a different Password:'});
            this.setState({errPasswordStyle : 'textBoxErr'});
        }

    };

    render() {
        return (
            <ScrollView>
                <Text>Create Account</Text>
                <TextBox
                    placeholder='First Name'
                    onChangeText={(text) => this.setState({ firstName: text })}
                    value={this.state.firstName}
                    style={styles.textBox}
                />
                <TextBox
                    placeholder='Last Name'
                    onChangeText={(text) => this.setState({ lastName: text })}
                    value={this.state.lastName}
                    style={styles.textBox}
                />
                <TextBox 
                    // placeholder='Email'
                    placeholder={this.state.errEmail}
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                    style={styles[this.state.errEmailStyle]}
                />
                <TextBox
                    placeholder={this.state.errUsername}
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                    style={styles[this.state.errUsernameStyle]}
                />
                <TextBox
                    placeholder={this.state.errPassword}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                    style={styles[this.state.errPasswordStyle]}
                />
                <TextBox
                    placeholder="Change Password"
                    onEndEditing={(e) => console.log(e.nativeEvent.text)}
                    style={styles.textBox}
                />
                <Button 
                    buttonText='Sign up'
                    onPress={() => this.props.navigation.navigate('Login')}
                />
                <Button
                    buttonText='Dev: Test Error Messages'
                    onPress={() => this.opError("Test")}
                />
            </ScrollView>
        );
    }
}