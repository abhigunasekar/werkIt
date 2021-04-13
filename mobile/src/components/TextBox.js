import React, { Component } from 'react';
import { TextInput } from 'react-native';

import styles from '../light';

export default class TextBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
                onChangeText={this.props.onChangeText}
                onEndEditing={this.props.onEndEditing}
                textAlign={this.props.textAlign}
                onKeyPress={this.props.onKeyPress}
                secureTextEntry={this.props.secureTextEntry}
                placeholder={this.props.placeholder}
                placeholderTextColor={this.props.darkmode ? '#777777' : '#C7C7CD'}
                color={this.props.darkmode ? '#FFFFFF' : '#000000'}
                keyboardType={this.props.keyboardType}
                maxLength={this.props.maxLength}
                style={[ styles.textBox, this.props.style ]}
                defaultValue={this.props.defaultValue}
                value={this.props.value}
            />
        );
    }
}