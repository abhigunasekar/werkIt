import React, { Component } from 'react';
import { Pressable, Text } from 'react-native';

import styles from '../styles';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.purple) {
            return (
                <Pressable
                    onPress={() => this.props.onPress()}
                    style={({ pressed }) => [ { backgroundColor: pressed ? '#7641BD' : '#FFFFFF' , borderColor: '#7641BD'}, styles.button, this.props.style ]}
                >
                    {({ pressed }) => <Text style={{color: pressed ? '#FFFFFF' : '#7641BD'}}>{this.props.buttonText}</Text> }
                </Pressable>
            );
        } else {
            return (
                <Pressable
                    onPress={() => this.props.onPress()}
                    style={({ pressed }) => [ { backgroundColor: pressed ? '#FB963C' : '#FFFFFF' , borderColor: '#FB963C'}, styles.button, this.props.style ]}
                >
                    {({ pressed }) => <Text style={{color: pressed ? '#FFFFFF' : '#FB963C'}}>{this.props.buttonText}</Text> }
                </Pressable>
            );
        }
    }
}