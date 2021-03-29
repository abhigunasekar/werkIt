import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Text, Keyboard } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import TextBox from '../components/TextBox';
import HideableView from '../components/HideableView';

import styles from '../styles';
import Button from '../components/Button';

export default class ExerciseEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            // sets: this.props.sets,
            // reps: this.props.reps,
            // weight: this.props.weight,
            // duration: this.props.duration,
            // distance: this.props.distance,
            // pace: this.props.pace,
            // incline: this.props.incline,
            // laps: this.props.laps
            selectedFields: [],
        };
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View /*style={styles.exerciseEditorContainer}*/>
                    <TextBox
                        placeholder='Name'
                        onEndEditing={(e) => this.setState({ name: e.nativeEvent.text })}
                        value={this.state.name}
                    />
                    <Text>Select all that apply:</Text>
                    <SelectMultiple
                        items={['Sets', 'Reps', 'Weight', 'Duration', 'Distance', 'Pace', 'Incline', 'Laps']}
                        selectedItems={this.state.selectedFields}
                        style={{marginTop: 10}}
                        rowStyle={{padding: 10}}
                        checkboxStyle={{width: 20, height: 20}}
                        labelStyle={{marginLeft: 5}}
                        onSelectionsChange={(items) => this.setState({ selectedFields: items })}

                    />
                    <HideableView
                        name='Sets: '
                        update={(e) => this.setState({ sets: e.nativeEvent.text })}
                        value={this.state.sets}
                        maxLength={2}
                        style={{width: 33}}
                        visible={true}
                    />
                    <HideableView
                        name='Reps: '
                        update={(e) => this.setState({ reps: e.nativeEvent.text })}
                        value={this.state.reps}
                        visible={true}
                    />
                    <HideableView
                        name='Weight: '
                        update={(e) => this.setState({ weight: e.nativeEvent.text })}
                        style={{width: 60}}
                        value={this.state.weight}
                        visible={true}
                    />
                    <HideableView
                        name='Duration: '
                        update={(e) => this.setState({ duration: e.nativeEvent.text })}
                        style={{width: 60}}
                        value={this.state.duration}
                        visible={true}
                    />
                    <HideableView
                        name='Distance: '
                        update={(e) => this.setState({ distance: e.nativeEvent.text })}
                        style={{width: 60}}
                        value={this.state.distance}
                        visible={true}
                    />
                    <HideableView
                        name='Pace: '
                        update={(e) => this.setState({ pace: e.nativeEvent.text })}
                        value={this.state.pace}
                        visible={true}
                    />
                    <HideableView
                        name='Incline: '
                        update={(e) => this.setState({ incline: e.nativeEvent.text })}
                        value={this.state.incline}
                        visible={true}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 15}}>
                    <Button
                        buttonText='Cancel'
                        onPress={() => this.props.dismiss()}
                        orange={true}
                    />
                    <Button
                        buttonText='Delete'
                        onPress={() => {
                            this.props.deleteExercise(this.state);
                            this.props.dismiss();
                        }}
                        orange={true}
                    />
                    <Button
                        buttonText='Submit'
                        onPress={() => {
                            this.props.createExercise(this.state);
                            this.props.dismiss();
                        }}
                        orange={true}
                    />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}