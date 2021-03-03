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
        this.passwordMatcher = this.passwordMatcher.bind(this);
    }

    passwordHandler(text) {
        console.log('Password Handler');
        this.setState({ password: text });
        console.log(text);
        console.log(this.state.password);
        this.setState({ dummy: '' });

        let str = '';

        for (let i = 1; i < text.length; i++) {
            str += '*';
        }

        console.log(str);

        this.setState({ dummy: str });
        console.log(this.state.dummy);
    }

    passwordMatcher(e) {
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
                            // onKeyPress={({ nativeEvent }) => {
                            //     if (nativeEvent.key === 'Backspace') {
                            //         console.log('backspace');
                            //         console.log(this.state.dummy.length);
                            //         const str = this.state.dummy.slice(0, -1);
                            //         console.log(this.state.dummy);
                            //         console.log(str);

                            //         this.setState((state) => ({ dummy: state.dummy.slice(0, -1) }));
                            //         console.log(this.state.dummy.length);
                            //     }
                            // }}
                            onChangeText={(text) => {
                                let str = '';

                                for (let i = 0; i < text.length; i++) {
                                    str += '*';
                                }

                                this.setState({ dummy: str });
                            }}
                            //onEndEditing={(e) => this.setState({ password: e.nativeEvent.text })}
                            value={this.state.dummy}
                        />
                        <TextBox
                            placeholder="Change Password"
                            onEndEditing={(e) => this.passwordMatcher(e)}
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