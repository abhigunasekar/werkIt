import React, { Component } from 'react';
import { TextInput } from 'react-native';

import styles from './styles';

export default class TextBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
                onChangeText={this.props.onChangeText}
                placeholder={this.props.placeholder}
                style={styles.textBox}
            />
        );
    }
}