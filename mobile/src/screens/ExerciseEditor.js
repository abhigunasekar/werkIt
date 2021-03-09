import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, Keyboard } from 'react-native';

import TextBox from '../components/TextBox';
import HideableView from '../components/HideableView';

import styles from '../styles';
import Button from '../components/Button';

export default class ExerciseEditor extends Component {
    constructor() {
        super();

        this.state = {
            name: '',
            sets: 0,
            reps: 0,
            weight: 0,
            duration: 0,
            distance: 0,
            pace: 0,
            incline: 0
        };
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.exerciseEditorContainer}>
                    <TextBox
                        placeholder='Name'
                        onEndEditing={(e) => this.setState({ name: e.nativeEvent.text })}
                    />
                    <HideableView
                        name='Sets: '
                        update={(e) => this.setState({ sets: e.nativeEvent.text })}
                        visible={true}
                    />
                    <HideableView
                        name='Reps: '
                        update={(e) => this.setState({ reps: e.nativeEvent.text })}
                        visible={true}
                    />
                    <HideableView
                        name='Weight: '
                        update={(e) => this.setState({ weight: e.nativeEvent.text })}
                        style={{width: 60}}
                        visible={true}
                    />
                    <HideableView
                        name='Duration: '
                        update={(e) => this.setState({ duration: e.nativeEvent.text })}
                        style={{width: 60}}
                        visible={true}
                    />
                    <HideableView
                        name='Distance: '
                        update={(e) => this.setState({ distance: e.nativeEvent.text })}
                        style={{width: 60}}
                        visible={true}
                    />
                    <HideableView
                        name='Pace: '
                        update={(e) => this.setState({ pace: e.nativeEvent.text })}
                        visible={true}
                    />
                    <HideableView
                        name='Incline: '
                        update={(e) => this.setState({ incline: e.nativeEvent.text })}
                        visible={true}
                    />
                    <Button
                        onPress={() => {
                            this.props.createExercise(this.state);
                            this.props.dismiss();
                        }}
                        orange={true}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}