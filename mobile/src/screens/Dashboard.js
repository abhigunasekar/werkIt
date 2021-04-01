import React, { Component } from 'react';
import { View, Text } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import * as serverMethods from '../ServerMethods';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            savedWorkoutPlans: [],
            activeWorkoutPlan: '',
        }
    }

    componentDidMount() {
        //server call to get current active workout?
        serverMethods.getUserWorkoutPlans(this.state.username)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                let array = this.state.savedWorkoutPlans;
                response.map((workoutPlan) => array.push({ label: workoutPlan, value: workoutPlan }))
                this.setState({ savedWorkoutPlans: array })
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
            <View>
                <DropDownPicker
                    items={this.state.savedWorkoutPlans}
                    defaultValue={''}
                    placeholder='Select an active workout plan'
                    containerStyle={{height: 40, width: '50%'}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={(item) => {
                        if (this.state.activeWorkoutPlan !== '') {
                            serverMethods.updateWorkoutPlanActiveStatus(this.state.username, this.state.activeWorkoutPlan, { active: false });
                        }
                        serverMethods.updateWorkoutPlanActiveStatus(this.state.username, item.value, { active: true }); 
                        this.setState({ activeWorkoutPlan: item.value });
                    }}
                />
                <Text>{today}</Text>
                <Text>Today is: {day}</Text>
            </View>
        );
    }
}