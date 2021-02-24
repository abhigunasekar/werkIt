import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import Button from '../Button';
import TextBox from '../TextBox';

export default class Login extends Component {
    constructor() {
        super();

        this.state = {

        }

        this.buttonPress = this.buttonPress.bind(this);
    }

    buttonPress() {
        console.log('Login Button Pressed');
    }

    render() {
        return (
            <ScrollView>
                <TextBox
                    placeholder="Username"
                />
                <TextBox
                    placeholder="Password"
                />
                <Button 
                    buttonText="Login"
                    onPress={this.buttonPress}
                />
            </ScrollView>
        );
    }
}