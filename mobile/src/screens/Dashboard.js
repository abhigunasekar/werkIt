import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import Button from '../components/Button';
import WorkoutLabel from '../components/WorkoutLabel';

import styles from '../styles';

export default class Dashboard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            workouts: [],
            currWorkout: '',
        };

        this.createWorkout = this.createWorkout.bind(this);
    }

    componentDidMount() {
        // server call to get workouts related to user
        // this.setState({ workouts: response });
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
        if (workout.name !== undefined) {
        let newArray = this.state.workouts.map(workout => workout);
        newArray.push({ name: workout.name, exercises: workout.exercises });

        this.setState({ workouts: newArray });
        }
    }

    render() {
        let workoutList = [];
        for (let i = 0; i < this.state.workouts.length; i++) {
            let workout = this.state.workouts[i];
            workoutList.push(
                <WorkoutLabel
                    key={i}
                    name={workout.name}
                    exercises={workout.exercises}
                    edit={() => this.props.navigation.navigate('WorkoutEditor', { workout: workout })}
                />
            );
        }
        return(
            <View style={styles.dashboardContainer}>
                {/* <Text style={styles.motivationalQuote}>Motivational Quote</Text> */}
                <View style={{borderColor: "#000000", borderBottomWidth: 2, marginTop: 10, width: '75%', alignItems: 'center'}}>
                    <Text style={{fontSize: 30}}>Workouts</Text>
                </View>
                <ScrollView style={styles.workoutList} contentContainerStyle={{alignItems: 'center'}}>
                    <Text style={{fontSize: 15}}>{(this.state.workouts.length !== 0) ? "" : "Create a new workout to get started!"}</Text>
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