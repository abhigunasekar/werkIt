import React, { Component } from 'react';
import { Pressable, Text } from 'react-native';

import styles from '../styles';

export default class Label extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Pressable>
                <Text>{this.props.name}</Text>

            </Pressable>
        );
    }
}