import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import Button from '../components/Button';
import WorkoutLabel from '../components/WorkoutLabel';

import styles from '../styles';

export default class Dashboard extends Component{
    constructor(props) {
        super(props);

        //console.log(this.props.route.params);
        this.state = {
            workouts: [],
            currWorkout: '',
        };

        this.createWorkout = this.createWorkout.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.route.params?.workout !== this.props.route.params?.workout) {
            this.createWorkout(this.props.route.params?.workout);
        }
    }

    editWorkout(workout) {
        this.setState({ currWorkout: workout });

    }

    createWorkout(workout) {
        let newArray = this.state.workouts.map(workout => workout);
        newArray.push({ name: workout.name, exercises: workout.exercises });

        this.setState({ workouts: newArray });
    }

    render() {
        let workoutList = [];
        for (let i = 0; i < this.state.workouts.length; i++) {
            let workout = this.state.workouts[i];
            workoutList.push(
                <WorkoutLabel
                    key={i}
                    name={workout.name}
                    exercises={workout.exercies}
                    edit={() => this.props.navigation.navigate('WorkoutEditor', { workout: workout })}
                />
            );
        }
        return(
            <View style={styles.dashboardContainer}>
                <Text style={styles.motivationalQuote}>Motivational Quote</Text>
                <ScrollView style={styles.workoutList} contentContainerStyle={{alignItems: 'center'}}>
                    <Text>Workouts go here</Text>
                    {workoutList}
                </ScrollView>
                <Button
                    buttonText='Create New Workout'
                    onPress={() => this.props.navigation.navigate('WorkoutEditor')}
                    purple={true}
                />
            </View>
        );
    }
}