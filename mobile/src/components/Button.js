import React, { Component } from 'react';
import { Pressable, Text } from 'react-native';

import styles from '../styles';

export default class Button extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Pressable
                onPress={() => this.props.onPress()}
                style={({ pressed }) => [ { backgroundColor: pressed ? '#7641BD' : '#FFFFFF' }, styles.button ]}
            >
                {({ pressed }) => <Text style={{color: pressed ? '#FFFFFF' : '#7641BD'}}>{this.props.buttonText}</Text> }
            </Pressable>
        );
    }
}