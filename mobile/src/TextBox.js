import React, { Component } from 'react'
import { TextInput } from 'react-native'

export default class TextBox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TextInput
                onChangeText={this.props.onChangeText}
                placeholder={this.props.placeholder}
            />
        );
    }
}