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
            name: this.props.route.params.workoutPlan === undefined ? '' : this.props.route.params.workoutPlan,
            Monday: 'None',
            Tuesday: 'None',
            Wednesday: 'None',
            Thursday: 'None',
            Friday: 'None',
            Saturday: 'None',
            Sunday: 'None',
            savedWorkouts: [{label: 'None', value: 'None'}],
        }
    }

    componentDidMount() {
        console.log('mounted')
        //server call to get workout plan information if user decides to edit the workout plan
        serverMethods.getUserWorkouts(this.props.route.params.username)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                let array = this.state.savedWorkouts;
                response.map((workout) => array.unshift({label: workout, value: workout}))
                this.setState({ savedWorkouts: array })
            });
        if (this.props.route.params.edit) {
            console.log('edit')
            serverMethods.getWorkoutPlan(this.props.route.params.username, this.state.name)
                .then(response => response.json())
                .then(response => {
                    console.log("-------------------------------------")
                    console.log(response)
                    console.log("-------------------------------------")
                    this.setState({ Monday: response.Monday, Tuesday: response.Tuesday, Wednesday: response.Wednesday, Thursday: response.Thursday, Friday: response.Friday, Saturday: response.Saturday, Sunday: response.Sunday})
                })
        }
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
                        defaultValue={this.state.Monday}
                        select={(workout) => this.setState({ Monday: workout })}
                        margin={60}
                        zIndex={7000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Tuesday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Tuesday}
                        select={(workout) => this.setState({ Tuesday: workout })}
                        margin={60}
                        zIndex={6000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Wednesday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Wednesday}
                        select={(workout) => this.setState({ Wednesday: workout })}
                        margin={40}
                        zIndex={5000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Thursday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Thursday}
                        select={(workout) => this.setState({ Thursday: workout })}
                        margin={50}
                        zIndex={4000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Friday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Friday}
                        select={(workout) => this.setState({ Friday: workout })}
                        margin={70}
                        zIndex={3000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Saturday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Saturday}
                        select={(workout) => this.setState({ Saturday: workout })}
                        margin={50}
                        zIndex={2000}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Sunday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Sunday}
                        select={(workout) => this.setState({ Sunday: workout })}
                        margin={60}
                        zIndex={1000}
                        darkmode={this.props.darkmode}
                    />
                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <Button
                            buttonText='Cancel'
                            onPress={() => this.props.navigation.navigate('WorkoutPlans')}
                            style={{marginRight: 40}}
                            darkmode={this.props.darkmode}
                            orange={true}
                        />
                        <Button
                            buttonText='Delete'
                            onPress={() => {
                                serverMethods.deleteWorkoutPlan(this.props.route.params.username, this.state.name);
                                this.props.navigation.navigate('WorkoutPlans');
                            }}
                            style={{marginRight: 40}}
                            darkmode={this.props.darkmode}
                            orange={true}
                        />
                        <Button
                            buttonText='Submit'
                            onPress={() => {
                                if (this.state.name === '') {
                                    missingNameError();
                                } else {
                                    if (this.props.route.params.edit) {
                                        serverMethods.editWorkoutPlan(this.props.route.params.username, this.props.route.params.workoutPlan,
                                            {
                                                name: this.state.name,
                                                Monday: this.state.Monday === '' ? 'None' : this.state.Monday,
                                                Tuesday: this.state.Tuesday === '' ? 'None' : this.state.Tuesday,
                                                Wednesday: this.state.Wednesday === '' ? 'None' : this.state.Wednesday,
                                                Thursday: this.state.Thursday === '' ? 'None': this.state.Thursday,
                                                Friday: this.state.Friday === '' ? 'None' : this.state.Friday,
                                                Saturday: this.state.Saturday === '' ? 'None' : this.state.Saturday,
                                                Sunday: this.state.Sunday === '' ? 'None' : this.state.Sunday
                                            }
                                        );
                                    } else {
                                        serverMethods.createWorkoutPlan(this.props.route.params.username, 
                                            {
                                                name: this.state.name,
                                                Monday: this.state.Monday === '' ? 'None' : this.state.Monday,
                                                Tuesday: this.state.Tuesday === '' ? 'None' : this.state.Tuesday,
                                                Wednesday: this.state.Wednesday === '' ? 'None' : this.state.Wednesday,
                                                Thursday: this.state.Thursday === '' ? 'None': this.state.Thursday,
                                                Friday: this.state.Friday === '' ? 'None' : this.state.Friday,
                                                Saturday: this.state.Saturday === '' ? 'None' : this.state.Saturday,
                                                Sunday: this.state.Sunday === '' ? 'None' : this.state.Sunday
                                            }
                                        );
                                    }
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