import React, { Component } from 'react';
import { View, Text } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import Button from '../components/Button';

import * as serverMethods from '../ServerMethods';
import light from '../light';
import dark from '../dark';
  
export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            savedWorkoutPlans: [],
            activeWorkoutPlan: '',
            workout: '',
            day: '',
        }
    }

    updateWorkout() {
            let date = new Date();
            switch(date.getDay()) {
                case 0:
                    this.setState({ workout: this.state.activeWorkoutPlan?.Sunday, day: 'Sunday' });
                    break;
                case 1:
                    this.setState({ workout: this.state.activeWorkoutPlan?.Monday, day: 'Monday' });
                    break;
                case 2:
                    this.setState({ workout: this.state.activeWorkoutPlan?.Tuesday, day: 'Tuesday' });
                    break;
                case 3:
                    this.setState({ workout: this.state.activeWorkoutPlan?.Wednesday, day: 'Wednesday' });
                    break;
                case 4:
                    this.setState({ workout: this.state.activeWorkoutPlan?.Thursday, day: 'Thursday' });
                    break;
                case 5:
                    this.setState({ workout: this.state.activeWorkoutPlan?.Friday, day: 'Friday' });
                    break;
                case 6:
                    this.setState({ workout: this.state.activeWorkoutPlan?.Saturday, day: 'Saturday' });
                    break;
            }
    }

    componentDidMount() {
        //server call to get current active workout?
        serverMethods.getActiveWorkoutPlan(this.state.username)
            .then(response => response.json())
            .then(response => this.setState({ activeWorkoutPlan: response }, () => this.updateWorkout()))
            .catch(err => console.log(err));
        
        serverMethods.getUserWorkoutPlans(this.state.username)
            .then(response => response.json())
            .then(response => {
                let array = [];
                response.map((workoutPlan) => array.push({ label: workoutPlan, value: workoutPlan }))
                this.setState({ savedWorkoutPlans: array })
            })
            .catch(err => console.log(err));
        this.listener = this.props.navigation.addListener('focus', () =>
        {
            serverMethods.getUserWorkoutPlans(this.state.username)
                .then(response => response.json())
                .then(response => {
                    let array = [];
                    response.map((workoutPlan) => array.push({ label: workoutPlan, value: workoutPlan }))
                    this.setState({ savedWorkoutPlans: array })
                }).catch(err => console.log(err))
            serverMethods.getActiveWorkoutPlan(this.state.username)
                .then(response => response.json())
                .then(response => this.setState({ activeWorkoutPlan: response }, () => this.updateWorkout()))
                .catch(err => console.log(err))
            }
        );
        // what happens if the user doesn't have an active workout plan
    }

    componentWillUnmount() {
        this.listener();
    }

    nextUpcomingWorkout(day) {
        let nextWorkout = '';
        if (this.state.activeWorkoutPlan === null) {
            return '';
        }

        if (day === 0) {
            day = 7;
        }

        if (this.state.activeWorkoutPlan.Tuesday !== "None" && day < 2) {
            nextWorkout += 'Tuesday: ' + this.state.activeWorkoutPlan.Tuesday + '\n';
        }
        if (this.state.activeWorkoutPlan.Wednesday !== "None" && day < 3) {
            nextWorkout += 'Wednesday: ' + this.state.activeWorkoutPlan.Wednesday + '\n';
        }
        if (this.state.activeWorkoutPlan.Thursday === "None" && day < 4) {
            nextWorkout += 'Thursday: ' + this.state.activeWorkoutPlan.Thursday + '\n';
        }
        if (this.state.activeWorkoutPlan.Friday !== "None" && day < 5) {
            nextWorkout += 'Friday: ' + this.state.activeWorkoutPlan.Friday + '\n';
        }
        if (this.state.activeWorkoutPlan.Saturday !== "None" && day < 6) {
            nextWorkout += 'Saturday: ' + this.state.activeWorkoutPlan.Saturday + '\n';
        }
        if (this.state.activeWorkoutPlan.Sunday !== 'None' && day < 7) {
            nextWorkout += 'Sunday: ' + this.state.activeWorkoutPlan.Sunday + '\n';
        }
        
        return nextWorkout;
    }

    render() {
        let today = new Date();
        let day = today.getDay();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;

        // {workout_name: , day: , date: , time:, type_name }

        return (
            <View style={this.props.darkmode ? dark.dashboardContainer : light.dashboardContainer}>
                <Text style={[this.props.darkmode ? dark.text : light.text, {fontSize: 20, margin: 25}]}>Welcome {this.state.username}!</Text>
                <Text style={[this.props.darkmode ? dark.text : light.text, {marginBottom: 10}]}>Your selected workout plan is: </Text>
                <DropDownPicker
                    items={this.state.savedWorkoutPlans}
                    defaultValue={''}
                    placeholder={(this.state.activeWorkoutPlan === null || this.state.activeWorkoutPlan === '') ? 'Select an active workout plan' : this.state.activeWorkoutPlan.name}
                    containerStyle={{height: 40, width: '65%'}}
                    style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                    dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                    arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                    onChangeItem={(item) => {
                        serverMethods.updateActiveWorkoutPlan(this.state.username, item.value)
                            .then(() => serverMethods.getActiveWorkoutPlan(this.state.username)
                                            .then(response => response.json())
                                            .then(response => this.setState({ activeWorkoutPlan: response }, () => this.updateWorkout()))
                                    ).catch(err => console.log(err));
                        //this.setState({ activeWorkoutPlan: item.value });
                    }}
                />
                <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 30}}>Today is: {this.state.day}</Text>
                <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 10}}>{((this.state.workout === undefined) || (this.state.workout === 'None')) ? 'You don\'t have a workout today' : 'Todays workout is: ' + this.state.workout}</Text>
                {/* <Text style={[this.props.darkmode ? dark.darkTextHeader : light.lightTextHeader]}>Your upcoming workout(s) is/are:</Text> */}
                <Text style={/*[this.props.darkmode ? dark.darkTextBase : light.lightTextBase]*/{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 50}}>{this.nextUpcomingWorkout(day) === '' ? 'You have no upcoming workouts this week!' : 
                    <View>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', fontWeight: 'bold'}}>Your upcoming workouts are:</Text>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 20, textAlign: 'center'}}>{this.nextUpcomingWorkout(day)}</Text>
                    </View>
                }</Text>
                {(this.state.workout === undefined) || (this.state.workout === '') ? null : 
                    <Button
                    buttonText='START'
                    onPress={() => this.props.navigation.navigate('Workout Tracker', { workout: this.state.workout, day: this.state.day, date: today })}
                    style={{marginTop: 50}}
                    darkmode={this.props.darkmode}
                    gray={true}
                    />
                }

            </View>
        );
    }
}