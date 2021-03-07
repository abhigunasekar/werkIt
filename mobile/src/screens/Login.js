import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View } from 'react-native';

import Button from '../components/Button';
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
                            onPress={() => {
                                console.log('Username: ' + this.state.username);
                                console.log('Password: ' + this.state.password);
                                this.props.login();
                            }}
                            purple={true}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}