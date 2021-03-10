import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import SwipeUpDown from 'react-native-swipe-up-down-fix';

import TextBox from '../components/TextBox';
import Button from '../components/Button';
import ExerciseLabel from '../components/ExerciseLabel';
import ExerciseEditor from './ExerciseEditor';

import styles from '../styles';

export default class WorkoutEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.route.params?.workout.name,
            exercises: this.props.route.params?.workout.exercises ?? [],
            currExercise: '',
        };

        this.createExercise = this.createExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
        this.editExercise = this.editExercise.bind(this);
    }

    createExercise(exercise) {
        let newArray = this.state.exercises.map(exercise => exercise);
        newArray.push({ name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline});

        this.setState({ exercises: newArray });
    }

    deleteExercise(exercise) {
        let newArray = this.state.exercises;

        for (let i = 0; i < newArray.length; i++) {
            if (exercise.name == newArray[i].name) {
                newArray.splice(i, 1);
            }
        }

        this.setState({ exercises: newArray });
    }

    editExercise(exercise) {
        this.setState({ currExercise: exercise });
        this.swipeUpDownRef.showFull();
    }

    render() {
        let exerciseList = [];
        for (let i = 0; i < this.state.exercises.length; i++) {
            let exercise = this.state.exercises[i];
            exerciseList.push(
                <ExerciseLabel
                    key={i}
                    name={exercise.name}
                    sets={exercise.sets}
                    reps={exercise.reps}
                    weight={exercise.weight}
                    duration={exercise.duration}
                    distance={exercise.distance}
                    pace={exercise.pace}
                    incline={exercise.incline}
                    edit={(exercise) => this.editExercise(exercise)}
                />
            );
        }
        return(
            <View style={styles.workoutEditorContainer} hasRef={(ref) => this.containerRef = ref}>
                
                {/* <Text style={{marginTop: 15, fontSize: 20}}>{this.state.workoutName}</Text> */}
                <TextBox
                    placeholder='Workout Name'
                    onChangeText={(text) => this.setState({ name: text })}
                    value={this.state.name}
                />
                <ScrollView style={styles.exerciseList} /*contentContainerStyle={{alignItems: 'center'}}*/>
                    {exerciseList}
                    <Button
                        buttonText='Add exercise'
                        style={{width: 150}}
                        onPress={() => this.swipeUpDownRef.showFull()}
                        orange={true}
                    />
                </ScrollView>
                <Button
                        buttonText='Submit'
                        onPress={() => {
                            this.props.navigation.navigate('Dashboard', { workout: this.state });
                            //this.props.navigation.navigate({ routeName: 'Dashboard', params: { workout: this.state } })
                        }}
                        style={{marginTop: 10}}
                        orange={true}
                />
                <SwipeUpDown		
                    itemFull={
                        <ExerciseEditor
                            createExercise={(exercise) => this.createExercise(exercise)}
                            deleteExercise={(exercise) => this.deleteExercise(exercise)}
                            dismiss={() => this.swipeUpDownRef.showMini()}
                            name={this.state.currExercise.name}
                            sets={this.state.currExercise.sets}
                            reps={this.state.currExercise.reps}
                            weight={this.state.currExercise.weight}
                            duration={this.state.currExercise.duration}
                            distance={this.state.currExercise.distance}
                            pace={this.state.currExercise.pace}
                            incline={this.state.currExercise.incline}
                        />
                    } // Pass props component when show full
                    style={{ backgroundColor: '#FFFFFF' }} // style for swipe
                    animation='easeInEaseOut'
                    hasRef={(ref) => this.swipeUpDownRef = ref}
                />
            </View>
        );
    }
}