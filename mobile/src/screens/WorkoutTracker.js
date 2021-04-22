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
            exercises: [],
            time: 0,
            finished: [],
            hr: 0,
            min: 0,
            sec: 0,
            type: '',
        }

        this.updateTime = this.updateTime.bind(this);
        this.logTime = this.logTime.bind(this);
    }

    updateTime() {
        this.setState({ time: (this.state.hr * 60) + (this.state.min) + (this.state.sec >= 30  ? 1 : 0) })
    }

    logTime(hr, min, sec) {
        this.setState({ hr: parseInt(hr), min: parseInt(min), sec: parseInt(sec) }, () => this.updateTime());
    }


    componentDidMount() {
        //server call to get information about the workout
        serverMethods.getWorkout(this.props.username, this.props.route.params.workout)
            .then(response => response.json())
            .then(response => {
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
                this.setState({ exercises: array, type: response.type })
            })
            .catch(err => console.log(err));
    }

    render() {
        return(
            <View style={this.props.darkmode ? dark.workoutTrackerContainer : light.workoutTrackerContainer}>
                <Stopwatch logTime={this.logTime} darkmode={this.props.darkmode}/>
                <ScrollView style={{width: '85%'}} contentContainerStyle={{alignItems: 'center'}}>
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
                            // {workout_name: , day: , date: , time:, type_name }
                            if (this.state.exercises.length !== this.state.finished.length) {
                                incompleteWorkoutError(() => {
                                    serverMethods.completeWorkout(this.props.username, {workout_name: this.props.route.params.workout, day: this.props.route.params.day, date: this.props.route.params.date, time: this.state.time, type_name: this.state.type });
                                    this.props.navigation.navigate('Dashboard');
                                });
                            } else {
                                serverMethods.completeWorkout(this.props.username, {workout_name: this.props.route.params.workout, day: this.props.route.params.day, date: this.props.route.params.date, time: this.state.time, type_name: this.state.type });
                                this.props.navigation.navigate('Dashboard');
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