import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';

import styles from '../styles';

export default class PasswordBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'row', marginLeft: 14}}>
                <TextInput
                    autoFocus={this.props.autoFocus}
                    onChangeText={this.props.onChangeText}
                    onEndEditing={this.props.onEndEditing}
                    onKeyPress={this.props.onKeyPress}
                    secureTextEntry={!this.state.showPassword}
                    placeholder={this.props.placeholder}
                    keyboardType={this.props.keyboardType}
                    style={[ styles.textBox, {width: '60%'} ]}
                    value={this.props.value}
                />
                <CheckBox
                    title=''
                    checked={this.state.showPassword}
                    onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                />
            </View>
        );
    }
}