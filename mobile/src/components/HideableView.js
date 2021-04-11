import React, { Component } from 'react';
import { View, Text } from 'react-native';

import TextBox from './TextBox';

import styles from '../light';

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
                        //style={[{marginLeft: 5, width: 60, height: 30, paddingLeft: 5, paddingTop: 0, paddingRight: 5}, this.props.style]}
                        style={{width: 60, height: 35, paddingTop: 5, paddingBottom: 5}}
                        //style={[{width: 30, height: 30}, this.props.style]}
                        onChangeText={this.props.update}
                        textAlign='right'
                        keyboardType='number-pad'
                        maxLength={this.props.maxLength}
                        value={this.props.value}
                    />
                </View>
            );
        } else {
            return null;
        }
    }
}