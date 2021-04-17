import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import SelectMultiple from 'react-native-select-multiple';

import Button from '../components/Button';
import ExerciseLabel from '../components/ExerciseLabel';
import * as serverMethods from '../ServerMethods';

export default class WorkoutTracker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workout: this.props.route.params.workout,
            exercises: [],
            time: '',
            finished: [],
        }
    }

    componentDidMount() {
        //server call to get information about the workout
        serverMethods.getWorkout(this.props.username, this.state.workout)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                let key = 0;
                let array = response.exercises.map(exercise => 
                    <ExerciseLabel
                        key={key++}
                        name={exercise.name}
                        sets={exercise.data[0].sets}
                        reps={exercise.data[0].reps}
                        weight={exercise.data[0].weight}
                        duration={exercise.data[0].duration}
                        distance={exercise.data[0].distance}
                        pace={exercise.data[0].pace}
                        incline={exercise.data[0].incline}
                        laps={exercise.data[0].laps}
                        darkmode={this.props.darkmode}
                        complete={(name) => {
                            let array = this.state.finished;
                            if (!array.includes(name)) {
                                array.push(name);
                            }
                            this.setState({ finished: array });
                        }}
                    />
                )
                this.setState({ exercises: array })
            });
    }

    render() {
        console.log('num exercises: ' + this.state.exercises.length)
        console.log('num finished: ' + this.state.finished.length)
        return(
            <View style={{alignItems: 'center', height: '100%'}}>
                <Text>Workout Tracker</Text>
                <Text>Todays workout: {this.state.workout}</Text>
                <ScrollView style={{width: '85%', borderWidth: 1}} contentContainerStyle={{borderWidth: 3, alignItems: 'center'}}>
                    {this.state.exercises}
                </ScrollView>
                <View style={{flexDirection: 'row', marginBottom: 30, marginTop: 30}}>
                    <Button
                        buttonText='Go back'
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                        darkmode={this.props.darkmode}
                        style={{marginRight: 60}}
                        gray={true}
                    />
                    <Button
                        buttonText='Submit'
                        onPress={() => {
                            if (this.state.exercises.length !== this.state.finished.length) {
                                console.log('lmfao');
                            } else {
                                console.log('success');
                            }
                        }}
                        darkmode={this.props.darkmode}
                        purple={true}
                    />
                </View>
            </View>
        )
    }
}