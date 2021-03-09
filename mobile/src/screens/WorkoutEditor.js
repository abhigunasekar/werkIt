import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import SwipeUpDown from 'react-native-swipe-up-down-fix';

import Button from '../components/Button';
import ExerciseLabel from '../components/ExerciseLabel';
import ExerciseEditor from './ExerciseEditor';

import styles from '../styles';

export default class WorkoutEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workoutName: this.props.route.params.workoutName,
            exercises: [],
        };

        this.createExercise = this.createExercise.bind(this);
        this.deleteExercise = this.deleteExercise.bind(this);
    }

    createExercise(exercise) {
        let newArray = this.state.exercises.map(exercise => exercise);
        newArray.push({ name: exercise.name, sets: exercise.sets, reps: exercise.reps, weight: exercise.weight, duration: exercise.duration, distance: exercise.distance, pace: exercise.pace, incline: exercise.incline});

        this.setState({ exercises: newArray });
    }

    deleteExercise(exercise) {
        let newArray = this.state.exercises;

        console.log(newArray.length);
        for (let i = 0; i < newArray.length; i++) {
            if (exercise.name == newArray[i].name) {
                console.log('found exercise');

                newArray.splice(i, 1);
            }
        }

        console.log(newArray.length);

        this.setState({ exercises: newArray });
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
                    edit={() => this.swipeUpDownRef.showFull()}
                />
            );
        }
        return(
            <View style={styles.workoutEditorContainer} hasRef={(ref) => this.containerRef = ref}>
                
                <Text style={{marginTop: 15, fontSize: 20}}>{this.state.workoutName}</Text>
                <ScrollView style={styles.exerciseList} /*contentContainerStyle={{alignItems: 'center'}}*/>
                    {exerciseList}
                    <Button
                        buttonText='Add exercise'
                        style={{width: 150}}
                        onPress={() => {
                            console.log(this.state.exercises);
                            this.swipeUpDownRef.showFull();
                        }}
                        orange={true}
                    />
                </ScrollView>
                <Button
                        buttonText='Submit'
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                        style={{marginTop: 10}}
                        orange={true}
                />
                <SwipeUpDown		
                    itemFull={
                        <ExerciseEditor
                            createExercise={(exercise) => this.createExercise(exercise)}
                            deleteExercise={(exercise) => this.deleteExercise(exercise)}
                            dismiss={() => this.swipeUpDownRef.showMini()}
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