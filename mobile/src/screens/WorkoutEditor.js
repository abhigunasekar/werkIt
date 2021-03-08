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
        this.state.exercises.push({ name: 'Exercise 1', sets: 3, reps: 7, weight: 100 });
        this.state.exercises.push({ name: 'Exercise 2', duration: 60, pace: 7 });
        this.state.exercises.push({ name: 'Exercise 3', distance: 2, pace: 8 });
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
                <Text style={{marginTop: 15, fontSize: 20}}>{this.state.workoutName}</Text>
                <ScrollView style={styles.exerciseList} /*contentContainerStyle={{alignItems: 'center'}}*/>
                    {exerciseList}
                    <Button
                        buttonText='Add exercise'
                        style={{width: 150}}
                        onPress={() => console.log(this.state.exercises)}
                        orange={true}
                    />
                </ScrollView>
                <Button
                        buttonText='Submit'
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                        style={{marginTop: 10}}
                        orange={true}
                    />
            </View>
        );
    }
}