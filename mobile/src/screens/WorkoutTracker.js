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
                    />
                )
                this.setState({ exercises: array })
            });
    }

    render() {
        console.log(this.state.exercises.length)
        return(
            <View style={{alignItems: 'center'}}>
                <Text>Workout Tracker</Text>
                <Text>Todays workout: {this.state.workout}</Text>
                {/* <ScrollView> */}
                {this.state.exercises}
                    <SelectMultiple
                        items={this.state.exercises}
                        selectedItems={this.state.finished}
                        style={{marginTop: 10, width: '80%'}}
                        rowStyle={{padding: 10, marginBottom: 15, borderRadius: 7, backgroundColor: this.props.darkmode ? '#3E3E3E' : '#FFFFFF'}}
                        checkboxStyle={{width: 20, height: 20, backgroundColor: this.props.darkmode ? '#3E3E3E' : '#FFFFFF'}}
                        selectedCheckboxStyle={{backgroundColor: this.props.darkmode ? '#FFFFFF' : null}}
                        labelStyle={{marginLeft: 5, color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                        //add a selected label style to imply "disabled"
                        onSelectionsChange={(items) => this.setState({ finished: items })}
                    />
                {/* </ScrollView> */}
                <Button
                    buttonText='Go back'
                    onPress={() => this.props.navigation.navigate('Dashboard')}
                    darkmode={this.props.darkmode}
                    gray={true}
                />
            </View>
        )
    }
}