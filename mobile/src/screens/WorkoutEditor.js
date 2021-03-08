import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import Button from '../components/Button';
import HideableView from '../components/HideableView';
import ExerciseLabel from '../components/ExerciseLabel';

import styles from '../styles';

export default class WorkoutEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workoutName: this.props.route.params.workoutName,
            exercises: [],
            mounted: false
        };
    }

    componentDidMount() {
        //code to load exercises into the array based on workoutName
        this.state.exercises.push({ name: 'Exercise 1', sets: true, reps: true, weight: true });
        this.state.exercises.push({ name: 'Exercise 2', duration: true, pace: true });
        this.state.exercises.push({ name: 'Exercise 3', distance: true, pace: true });
        this.setState({ mounted: true });
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
                />
            );
        }
        return(
            <View style={styles.workoutEditorContainer}>
                <Text style={{marginTop: 20, fontSize: 20}}>{this.state.workoutName}</Text>
                <ScrollView style={styles.exerciseList} contentContainerStyle={{alignItems: 'center'}}>
                    {exerciseList}
                    <Button
                        buttonText='Add new exercise'
                        style={{marginTop: 10}}
                        onPress={() => console.log('not yet implemented')}
                        orange={true}
                    />
                </ScrollView>
                <Button
                        buttonText='Submit'
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                        orange={true}
                    />
            </View>
        );
    }
}