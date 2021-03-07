import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, Keyboard } from 'react-native';

import styles from '../styles';

export default class ExerciseEditor extends Component {
    constructor() {
        super();

        this.state = {

        };
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.exerciseEditorContainer}>
                    
                </View>
            </TouchableWithoutFeedback>
        );
    }
}