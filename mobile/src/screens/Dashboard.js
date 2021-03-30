import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'

import Button from '../components/Button';
import WorkoutLabel from '../components/WorkoutLabel';
import * as serverMethods from '../ServerMethods';

import styles from '../styles';

export default class Dashboard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            workouts: [],
            currWorkout: '',
        };

        this.createWorkout = this.createWorkout.bind(this);
    }

    componentDidMount() {
        // server call to get workouts related to user
        serverMethods.getUserWorkouts(this.state.username)
            .then(response => response.json())
            .then(response => this.setState({ workouts: response }));
        // this.setState({ workouts: response });
    }

    componentDidUpdate(prevProps) {
        // this will probably need to change after server calls are introduced
        if (prevProps.route.params?.workout !== this.props.route.params?.workout) {
            this.createWorkout(this.props.route.params?.workout);
        }
    }

    editWorkout(workout) {
        this.setState({ currWorkout: workout });
        //find current workout in the this.state.workouts
    }

    createWorkout(workout) {
        if (workout.name !== undefined) {
            //server call to add new workout to database (maybe do this in workout editor?)
        let newArray = this.state.workouts.map(workout => workout);
        newArray.push({ name: workout.name, exercises: workout.exercises });

        this.setState({ workouts: newArray });
        }
    }

    render() {
        console.log(this.state.username);
        let workoutList = [];
        for (let i = 0; i < this.state.workouts.length; i++) {
            let workout = this.state.workouts[i];
            workoutList.push(
                <WorkoutLabel
                    key={i}
                    name={workout.name}
                    exercises={workout.exercises} // is this necessary lmao
                    edit={() => this.props.navigation.navigate('WorkoutEditor', { workout: workout })}
                />
            );
        }
        return(
            <View style={styles.dashboardContainer}>
                <View style={{borderColor: "#000000", borderBottomWidth: 2, marginTop: 10, width: '75%', alignItems: 'center'}}>
                    <Text style={{fontSize: 30}}>Workouts</Text>
                </View>
                <ScrollView style={styles.workoutList} contentContainerStyle={{alignItems: 'center'}}>
                    <Text style={{fontSize: 15}}>{(this.state.workouts.length !== 0) ? "" : "Create a new workout to get started!"}</Text>
                    {workoutList}
                    <Button
                        buttonText='Create New Workout'
                        onPress={() => this.props.navigation.navigate('WorkoutEditor', { username: this.state.username })}
                        style={{marginTop: 20}}
                        purple={true}
                    />
                </ScrollView>

            </View>
        );
    }
}