import React, { Component } from 'react';
import { View, Text } from 'react-native';

import TextBox from './TextBox';

export default class HideableView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.visible) {
            return (
                <View>
                    <Text>{this.props.name}</Text>
                    <TextBox
                        placeholder='#'
                    />
                </View>
            );
        } else {
            return null;
        }
    }
}