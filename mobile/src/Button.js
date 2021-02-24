import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from './styles';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.onPress()}
                style={styles.button}
            >
                <Text style={{color: '#7641BD'}}>{this.props.buttonText}</Text>
            </TouchableOpacity>
        );
    }
}