import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import Button from '../components/Button';
import TextBox from '../components/TextBox';

export default class CreateAccount extends Component {
    constructor() {
        super();

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: '',
        };
    }

    render() {
        return (
            <ScrollView>
                <Text>Create Account</Text>
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
                    value={this.state.password}
                />
                <TextBox
                    placeholder="Change Password"
                    onEndEditing={(e) => console.log(e.nativeEvent.text)}
                />
                <Button 
                    buttonText='Sign up'
                    onPress={() => this.props.navigation.navigate('Login')}
                />
            </ScrollView>
        );
    }
}