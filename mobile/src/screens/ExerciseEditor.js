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
                        onChangeText={(text) => this.setState({ name: text })}
                        style={{width: '100%'}}
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
                    {/* <HideableView
                        name='Sets: '
                        onChangeText={(text) => this.setState({ sets: text })}
                        value={this.state.sets}
                        maxLength={2}
                        style={{width: 33}}
                        visible={true}
                    />
                    <HideableView
                        name='Reps: '
                        onChangeText={(text) => this.setState({ reps: text })}
                        value={this.state.reps}
                        visible={true}
                    />
                    <HideableView
                        name='Weight: '
                        onChangeText={(text) => this.setState({ weight: text })}
                        style={{width: 60}}
                        value={this.state.weight}
                        visible={true}
                    />
                    <HideableView
                        name='Duration: '
                        onChangeText={(text) => this.setState({ duration: text })}
                        style={{width: 60}}
                        value={this.state.duration}
                        visible={true}
                    />
                    <HideableView
                        name='Distance: '
                        onChangeText={(text) => this.setState({ distance: text })}
                        style={{width: 60}}
                        value={this.state.distance}
                        visible={true}
                    />
                    <HideableView
                        name='Pace: '
                        onChangeText={(text) => this.setState({ pace: text })}
                        value={this.state.pace}
                        visible={true}
                    />
                    <HideableView
                        name='Incline: '
                        onChangeText={(text) => this.setState({ incline: text })}
                        value={this.state.incline}
                        visible={true}
                    />
                    <HideableView
                        name='Laps: '
                        onChangeText={(text) => this.setState({ laps: text })}
                        value={this.state.laps}
                        visible={true}
                    /> */}
                    <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
                        <Button
                            buttonText='Cancel'
                            onPress={() => this.props.dismiss()}
                            style={{width: '35%', marginRight: 20}}
                            orange={true}
                        />
                        {/* <Button
                            buttonText='Delete'
                            onPress={() => {
                                this.props.deleteExercise(this.state);
                                this.props.dismiss();
                            }}
                            orange={true}
                        /> */}
                        <Button
                            buttonText='Submit'
                            onPress={() => {
                                //this.props.createExercise(this.state);
                                console.log(this.state.selectedFields)
                                //'Sets', 'Reps', 'Weight', 'Duration', 'Distance', 'Pace', 'Incline', 'Laps'
                                let exercise = {name: this.state.name, sets: false, reps: false, weight: false, duration: false, distance: false, pace: false, incline: false, laps: false};
                                for (let i = 0; i < this.state.selectedFields.length; i++) {
                                    switch(this.state.selectedFields[i].value) {
                                        case 'Sets':
                                            exercise.sets = true;
                                            break;
                                        case 'Reps':
                                            exercise.reps = true;
                                            break;
                                        case 'Weight':
                                            exercise.weight = true;
                                            break;
                                        case 'Duration':
                                            exercise.duration = true;
                                            break;
                                        case 'Distance':
                                            exercise.distance = true;
                                            break;
                                        case 'Pace':
                                            exercise.pace = true;
                                            break;
                                        case 'Incline':
                                            exercise.incline = true;
                                            break;
                                        case 'Laps':
                                            exercise.laps = true;
                                            break;
                                    }
                                }
                                //console.log(exercise);
                                this.props.createExercise(exercise); 
                                //make a call to helper function to server call to create new exercise
                                //this.props.dismiss();
                            }}
                            style={{width: '35%', marginLeft: 20}}
                            orange={true}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}