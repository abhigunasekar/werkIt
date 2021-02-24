import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';

import Button from '../Button';
import TextBox from '../TextBox';

import styles from '../styles';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <ScrollView style={styles.loginContainer} centerContent={true}>
                <View>
                    <TextBox
                        placeholder="Username"
                    />
                    <TextBox
                        placeholder="Password"
                    />
                    <Button 
                        buttonText="Login"
                        onPress={this.props.login}
                    />
                </View>
            </ScrollView>
        );
    }
}