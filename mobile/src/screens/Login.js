import React, { Component } from 'react';
/* import { bounce } from 'react-animations'; */
/* import Radium, {StyleRoot} from 'radium'; */
import { Image, Text, View, TouchableWithoutFeedback } from 'react-native';
import MMKVStorage from "react-native-mmkv-storage";
import ReactDOM from 'react-dom';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

import { invalidCredentialsAlert, invalidFormAlert } from '../components/Alerts';
import * as serverMethods from '../ServerMethods';
import styles from '../styles';
/* import { Style } from 'radium/lib';
import bounceOut from 'react-animations/lib/bounce-out'; */

/* const styles1 = {
    bounce: {
        animation: 'x 1s',
        animationName: Radium.keyframes(bounce, 'bounce'),
    }
} */

export default class Login extends Component {
    constructor(props) {
        super(props);
        /* this._retrieveData();
        var MMKV = new MMKVStorage.Loader().initialize();
        this.MMKV = MMKV;

        var result = MMKV.getStringAsync("current"); */
        /* if (result != null)
        {
            this.props.login();
        }
        else
        {
            console.log("Issue in fetching data");
        } */

        this.state = {
            username: '',
            password: '',
            errUsername: 'Username',
            errUsernameStyle: 'textBox',
            errPassword: 'Password',
            errPasswordStyle: 'textBox',
        };

        this.opError = this.opError.bind(this);
        this.keepSignedIn = this.keepSignedIn.bind(this);
        /* this._storeData = this._storeData.bind(this);
        this._retrieveData = this._retrieveData.bind(this); */
        
    }

    keepAnimating() {
        return (
            <Text>Werking On It...</Text>
        )
    }

    keepSignedIn() {
        console.log("We know how to implement checkboxes...YAAAY!");
        /* this.MMKV.setStringAsync("current", this.state.username + ':' + this.state.password); */
        // this._storeData();
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem(
                toString(this.state.username),
                toString(this.state.username) + ':' + toString(this.state.password));
        } catch (error) {
            console.log("Issue in saving data");
        }
    };

    _retrieveData = async () => {
        try {
            const result = await AsyncStorage.getItem(toString(this.state.username));
            if (result !== null) {
                console.log("We're on da waaay to implementing keep me signed in!");
                this.props.login();
            }
        } catch (error) {
            console.log("Issue in fetching data");
        }
    };

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
            <TouchableWithoutFeedback>
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
                            /* var i;
                            for (i = 0; i < 1000000; i++) {
                                this.keepAnimating();
                            } */
                            this.props.login();
                        }}
                    />
                    {/* <Button
                        buttonText='Dev: Test Error Messages'
                        onPress={() => this.opError("Test")}
                    /> */}
                   {/*  <label>
                        Keep me signed in:
                        <input
                            name="keepSignedIn"
                            type="checkbox"
                            onChange={this.keepSignedIn} />
                    </label> */}
                    
                </View>
            </View>
            </TouchableWithoutFeedback>
        );
    }
}