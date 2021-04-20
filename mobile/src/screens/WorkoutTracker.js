import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import Button from '../components/Button';
import ExerciseLabel from '../components/ExerciseLabel';
import Stopwatch from '../components/Stopwatch';
import { incompleteWorkoutError } from '../components/Alerts';

import * as serverMethods from '../ServerMethods';
import dark from '../dark';
import light from '../light';

export default class WorkoutTracker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workout: this.props.route.params.workout,
            exercises: [],
            time: '',
            finished: [],
            hr: 0,
            min: 0,
            sec: 0,
        }

        this.updateTime = this.updateTime.bind(this);
    }

    updateTime(hr, min, sec) {
        this.setState({ hr: parseInt(hr), min: parseInt(min), sec: parseInt(sec) });
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
                        sets={exercise.data.sets}
                        reps={exercise.data.reps}
                        weight={exercise.data.weight}
                        duration={exercise.data.duration}
                        distance={exercise.data.distance}
                        pace={exercise.data.pace}
                        incline={exercise.data.incline}
                        laps={exercise.data.laps}
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
            <View style={this.props.darkmode ? dark.workoutTrackerContainer : light.workoutTrackerContainer}>
                {/* put stopwatch here */}
                <Stopwatch updateTime={this.updateTime} darkmode={this.props.darkmode}/>
                <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000' , fontWeight: 'bold', fontSize: 20}}>{this.state.workout}</Text>
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
                                //do we know what happens if "finish anyway"
                                incompleteWorkoutError(() => this.props.navigation.navigate('Dashboard'));
                            } else {
                                this.props.navigation.navigate('Dashboard'/*, format for time here */);
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