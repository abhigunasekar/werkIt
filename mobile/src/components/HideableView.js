import React, { Component } from 'react';
import { View, Text } from 'react-native';

import TextBox from './TextBox';

import styles from '../styles';

export default class HideableView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.visible) {
            return (
                <View style={styles.hideableView}>
                    <Text style={{marginBottom: 13}}>{this.props.name}</Text>
                    <TextBox
                        style={[{marginLeft: 5, width: 30, height: 30, paddingLeft: 5, paddingBottom: 0, paddingTop: 0, paddingRight: 5}, this.props.style]}
                        onEndEditing={this.props.update}
                        keyboardType='number-pad'
                        value={this.props.value}
                    />
                </View>
            );
        } else {
            return null;
        }
    }
}