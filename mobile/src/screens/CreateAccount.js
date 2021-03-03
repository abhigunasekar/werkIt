import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, View, Text, KeyboardAvoidingView } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';
import styles from '../styles';

export default class CreateAccount extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
            dummy: ''
        };

        this.passwordHandler = this.passwordHandler.bind(this);
    }

    passwordHandler(e) {
        console.log('Password Matcher');
        console.log(e.nativeEvent.text);
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.createAccountContainer}>
                    <KeyboardAvoidingView style={styles.createAccountForm} behavior='padding'>
                        <Text style={styles.createAccountText}>Create Account</Text>
                        <TextBox
                            placeholder='First Name'
                            onChangeText={(text) => this.setState({ firstName: text })}
                            value={this.state.firstName}
                        />
                        <TextBox
                            placeholder='Last Name'
                            onChangeText={(text) => this.setState({ lastName: text })}
                            value={this.state.lastName}
                        />
                        <TextBox 
                            placeholder='Email'
                            onChangeText={(text) => this.setState({ email: text })}
                            value={this.state.email}
                        />
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
                        <TextBox
                            placeholder="Confirm Password"
                            onEndEditing={(e) => this.passwordMatcher(e)}
                            secureTextEntry={true}
                        />
                        <Button 
                            buttonText='Sign up'
                            onPress={() => {
                                console.log(this.state.dummy);
                                this.props.navigation.navigate('Login');
                            }}
                            style={{ marginTop: 10, borderColor: '#FB963C' }}
                        />
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}