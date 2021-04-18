import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { missingNameError } from '../components/Alerts';

import Button from '../components/Button';
import DayPicker from '../components/DayPicker';
import TextBox from '../components/TextBox';

import * as serverMethods from '../ServerMethods';

import light from '../light';
import dark from '../dark';

export default class WorkoutPlanEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            monday: '',
            tuesday: '',
            wednesday: '',
            thursday: '',
            friday: '',
            saturday: '',
            sunday: '',
            savedWorkouts: [],
        }
    }

    componentDidMount() {
        console.log('mounted')
        //server call to get workout plan information if user decides to edit the workout plan
        serverMethods.getUserWorkouts(this.props.route.params.username)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let array = this.state.savedWorkouts;
            response.map((workout) => array.unshift({label: workout, value: workout}))
            array.push({label: 'None', value: ''})
            this.setState({ savedWorkouts: array })
        });
    }

    render() {
        return(
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={this.props.darkmode ? dark.workoutPlanEditorContainer : light.workoutPlanEditorContainer}>
                    <TextBox
                        placeholder='Workout Plan Name'
                        value={this.state.name}
                        onChangeText={(text) => this.setState({ name: text })}
                        style={{marginBottom: 20}}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Monday'
                        savedWorkouts={this.state.savedWorkouts}
                        select={(workout) => this.setState({ monday: workout })}
                        margin={60}
                        zIndex={7000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Tuesday'
                        savedWorkouts={this.state.savedWorkouts}
                        select={(workout) => this.setState({ tuesday: workout })}
                        margin={60}
                        zIndex={6000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Wednesday'
                        savedWorkouts={this.state.savedWorkouts}
                        select={(workout) => this.setState({ wednesday: workout })}
                        margin={40}
                        zIndex={5000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Thursday'
                        savedWorkouts={this.state.savedWorkouts}
                        select={(workout) => this.setState({ thursday: workout })}
                        margin={50}
                        zIndex={4000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Friday'
                        savedWorkouts={this.state.savedWorkouts}
                        select={(workout) => this.setState({ friday: workout })}
                        margin={70}
                        zIndex={3000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Saturday'
                        savedWorkouts={this.state.savedWorkouts}
                        select={(workout) => this.setState({ saturday: workout })}
                        margin={50}
                        zIndex={2000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Sunday'
                        savedWorkouts={this.state.savedWorkouts}
                        select={(workout) => this.setState({ sunday: workout })}
                        margin={60}
                        zIndex={1000}
                        darkmode={this.props.darkmode}
                    />
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Button
                            buttonText='Cancel'
                            onPress={() => this.props.navigation.navigate('WorkoutPlans')}
                            style={{marginRight: 150}}
                            darkmode={this.props.darkmode}
                            orange={true}
                        />
                        <Button
                            buttonText='Submit'
                            onPress={() => {
                                if (this.state.name === '') {
                                    missingNameError();
                                } else {
                                    serverMethods.createWorkoutPlan(this.props.route.params.username, { name: this.state.name, Monday: this.state.monday, Tuesday: this.state.tuesday, Wednesday: this.state.wednesday, Thursday: this.state.thursday, Friday: this.state.friday, Saturday: this.state.saturday, Sunday: this.state.sunday });
                                    this.props.navigation.navigate('WorkoutPlans');
                                }
                            }}
                            darkmode={this.props.darkmode}
                            orange={true}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}