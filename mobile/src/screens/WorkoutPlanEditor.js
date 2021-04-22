import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { invalidFormAlert, missingNameError } from '../components/Alerts';

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
            Monday: '',
            Tuesday: '',
            Wednesday: '',
            Thursday: '',
            Friday: '',
            Saturday: '',
            Sunday: '',
            savedWorkouts: [{label: 'None', value: 'None'}],
        }
    }

    componentDidMount() {
        serverMethods.getUserWorkouts(this.props.route.params.username)
        .then(response => response.json())
        .then(response => {
            let array = this.state.savedWorkouts;
            response.map((workout) => array.unshift({label: workout, value: workout}))
            this.setState({ savedWorkouts: array }, () => {
                if (this.props.route.params.edit) {
                    serverMethods.getWorkoutPlan(this.props.route.params.username, this.state.name)
                        .then(response => response.json())
                        .then(response => {
                            this.setState({ Monday: response.Monday, Tuesday: response.Tuesday, Wednesday: response.Wednesday, Thursday: response.Thursday, Friday: response.Friday, Saturday: response.Saturday, Sunday: response.Sunday})
                        })
                        .catch(err => console.log(err));
                }   
            })
        })
        .catch(err => console.log(err));
        //server call to get workout plan information if user decides to edit the workout plan
        
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
                        username={this.props.route.params.username}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Tuesday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Tuesday}
                        select={(workout) => this.setState({ Tuesday: workout })}
                        margin={60}
                        zIndex={6000}
                        username={this.props.route.params.username}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Wednesday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Wednesday}
                        select={(workout) => this.setState({ Wednesday: workout })}
                        margin={40}
                        zIndex={5000}
                        username={this.props.route.params.username}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Thursday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Thursday}
                        select={(workout) => this.setState({ Thursday: workout })}
                        margin={50}
                        zIndex={4000}
                        username={this.props.route.params.username}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Friday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Friday}
                        select={(workout) => this.setState({ Friday: workout })}
                        margin={70}
                        zIndex={3000}
                        username={this.props.route.params.username}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Saturday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Saturday}
                        select={(workout) => this.setState({ Saturday: workout })}
                        margin={50}
                        zIndex={2000}
                        username={this.props.route.params.username}
                        darkmode={this.props.darkmode}
                    />
                    <DayPicker
                        day='Sunday'
                        savedWorkouts={this.state.savedWorkouts}
                        defaultValue={this.state.Sunday}
                        select={(workout) => this.setState({ Sunday: workout })}
                        margin={60}
                        zIndex={1000}
                        username={this.props.route.params.username}
                        darkmode={this.props.darkmode}
                    />
                    {/* <View style={{flexDirection: 'row', zIndex: 7000, marginBottom: 20}}>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 10, marginRight: 60}}>Monday:</Text>
                        <DropDownPicker
                            items={this.state.savedWorkouts}
                            defaultValue={this.state.Monday}
                            placeholder='Select a workout'
                            containerStyle={{height: 40, width: '50%'}}
                            style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                            dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                            onChangeItem={(item) => {
                                this.setState({ Monday: item.value })
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', zIndex: 6000, marginBottom: 20}}>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 10, marginRight: 60}}>Tuesday:</Text>
                        <DropDownPicker
                            items={this.state.savedWorkouts}
                            defaultValue={this.state.Tuesday}
                            placeholder='Select a workout'
                            containerStyle={{height: 40, width: '50%'}}
                            style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                            dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                            onChangeItem={(item) => {
                                this.setState({ Tuesday: item.value })
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', zIndex: 5000, marginBottom: 20}}>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 10, marginRight: 40}}>Wednesday:</Text>
                        <DropDownPicker
                            items={this.state.savedWorkouts}
                            defaultValue={this.state.Wednesday}
                            placeholder='Select a workout'
                            containerStyle={{height: 40, width: '50%'}}
                            style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                            dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                            onChangeItem={(item) => {
                                this.setState({ Wednesday: item.value })
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', zIndex: 4000, marginBottom: 20}}>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 10, marginRight: 50}}>Thursday:</Text>
                        <DropDownPicker
                            items={this.state.savedWorkouts}
                            defaultValue={this.state.Thursday}
                            placeholder='Select a workout'
                            containerStyle={{height: 40, width: '50%'}}
                            style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                            dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                            onChangeItem={(item) => {
                                this.setState({ Thursday: item.value })
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', zIndex: 3000, marginBottom: 20}}>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 10, marginRight: 70}}>Friday:</Text>
                        <DropDownPicker
                            items={this.state.savedWorkouts}
                            defaultValue={this.state.Friday}
                            placeholder='Select a workout'
                            containerStyle={{height: 40, width: '50%'}}
                            style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                            dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                            onChangeItem={(item) => {
                                this.setState({ Friday: item.value })
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', zIndex: 2000, marginBottom: 20}}>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 10, marginRight: 40}}>Saturday:</Text>
                        <DropDownPicker
                            items={this.state.savedWorkouts}
                            defaultValue={this.state.Saturday}
                            placeholder='Select a workout'
                            containerStyle={{height: 40, width: '50%'}}
                            style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                            dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                            onChangeItem={(item) => {
                                this.setState({ Saturday: item.value })
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', zIndex: 1000, marginBottom: 20}}>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 10, marginRight: 40}}>Sunday:</Text>
                        <DropDownPicker
                            items={this.state.savedWorkouts}
                            defaultValue={this.state.Sunday}
                            placeholder='Select a workout'
                            containerStyle={{height: 40, width: '50%'}}
                            style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                            dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                            arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                            onChangeItem={(item) => {
                                this.setState({ Sunday: item.value })
                            }}
                        />
                    </View> */}
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
                                } else if (this.state.Monday === '' || this.state.Tuesday === '' || this.state.Wednesday === '' || this.state.Thurdsay === '' || this.state.Friday === '' || this.state.Saturday === '' || this.state.Sunday === '') {
                                    invalidFormAlert();
                                } else {
                                    if (this.props.route.params.edit) {
                                        serverMethods.editWorkoutPlan(this.props.route.params.username, this.props.route.params.workoutPlan,
                                            {
                                                name: this.state.name,
                                                Monday: this.state.Monday,
                                                Tuesday: this.state.Tuesday,
                                                Wednesday: this.state.Wednesday,
                                                Thursday: this.state.Thursday,
                                                Friday: this.state.Friday,
                                                Saturday: this.state.Saturday,
                                                Sunday: this.state.Sunday
                                            }
                                        );
                                    } else {
                                        serverMethods.createWorkoutPlan(this.props.route.params.username, 
                                            {
                                                name: this.state.name,
                                                Monday: this.state.Monday,
                                                Tuesday: this.state.Tuesday,
                                                Wednesday: this.state.Wednesday,
                                                Thursday: this.state.Thursday,
                                                Friday: this.state.Friday,
                                                Saturday: this.state.Saturday,
                                                Sunday: this.state.Sunday
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