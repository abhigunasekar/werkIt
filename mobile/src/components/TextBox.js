import React, { Component } from 'react';
import { TextInput } from 'react-native';

import styles from '../styles';

export default class TextBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
                onChangeText={this.props.onChangeText}
                onEndEditing={this.props.onEndEditing}
                onKeyPress={this.props.onKeyPress}
                secureTextEntry={this.props.secureTextEntry}
                placeholder={this.props.placeholder}
                // style={styles.textBox}
                style={this.props.style}
            />
        );
    }
}