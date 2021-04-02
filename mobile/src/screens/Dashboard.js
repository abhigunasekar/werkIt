import React, { Component } from 'react';
import { View, Text } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import Stopwatch from '../components/Stopwatch';
import Button from '../components/Button';

import * as serverMethods from '../ServerMethods';
import styles from '../styles';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            savedWorkoutPlans: [],
            activeWorkoutPlan: '',
            hr: 0,
            min: 0,
            sec: 0,
        }

        this.logTime = this.logTime.bind(this);
    }

    logTime(hr, min, sec) {
        this.setState({ hr: parseInt(hr), min: parseInt(min), sec: parseInt(sec)});
    }

    componentDidMount() {
        //server call to get current active workout?

        serverMethods.getUserWorkoutPlans(this.state.username)
            .then(response => response.json())
            .then(response => {
                let array = this.state.savedWorkoutPlans;
                response.map((workoutPlan) => array.push({ label: workoutPlan, value: workoutPlan }))
                this.setState({ savedWorkoutPlans: array })
            });
        serverMethods.getActiveWorkoutPlan(this.state.username)
            .then(response => response.json())
            .then(response => {
                this.setState({ activeWorkoutPlan: response });
            });
    }

    render() {
        let today = new Date();
        let day = today.getDay();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '-' + dd + '-' + yyyy;

        return (
            <View style={styles.dashboardContainer}>
                <Text style={{fontSize: 20, margin: 25}}>Welcome {this.state.username}!</Text>
                <Text style={{marginBottom: 10}}>Your selected workout plan is: </Text>
                <DropDownPicker
                    items={this.state.savedWorkoutPlans}
                    defaultValue={''}
                    placeholder={(this.state.activeWorkoutPlan !== '') ? this.state.activeWorkoutPlan.name : 'Select an active workout plan'}
                    containerStyle={{height: 40, width: '50%'}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={(item) => {
                        serverMethods.updateActiveWorkoutPlan(this.state.username, item.value); 
                        this.setState({ activeWorkoutPlan: item.value });
                    }}
                />
                <Text>{today}</Text>
                <Text>Today is: {day}</Text>
                <Text>Elapsed time: {this.state.hr} hrs   {this.state.min} min   {this.state.sec} sec</Text>
                <Stopwatch finish={this.logTime}/>
                <Button
                    buttonText='Logout'
                    onPress={() => this.props.logout()}
                    orange={true}
                />
            </View>
        );
    }
}