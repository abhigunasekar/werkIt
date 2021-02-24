import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={() => this.props.onPress()}
            >
                <Text style={{color: '#f0f0f0'}}>{this.props.buttonText}</Text>
            </TouchableOpacity>
        );
    }
}