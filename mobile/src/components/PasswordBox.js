import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';

import Button from './Button';

import styles from '../light';

export default class PasswordBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
        }
    }

    render() {
        if (!this.props.biometric || this.props.value) {
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
                        style={[ styles.textBox, {width: '80%', marginRight: 9} ]}
                        value={this.props.value}
                    />
                    <CheckBox
                        title=''
                        checked={this.state.showPassword}
                        checkedIcon='eye-slash'
                        uncheckedIcon='eye'
                        containerStyle={{paddingTop: 2, marginLeft: -50}}
                        onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                    />
                </View>
            );
        } else {
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
                        style={[ styles.textBox, {width: '80%', marginLeft: -17} ]}
                        value={this.props.value}
                    />
                    <Button
                        onPress={this.props.biometric}
                        style={{marginTop: 7, marginLeft: -30}}
                        fingerPrint={true}
                    />
                </View>
            );
        }
    }
}