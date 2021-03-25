import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import WorkoutStackNavigator from './WorkoutStackNavigator';
import Settings from './screens/Settings';

const Drawer = createDrawerNavigator();

export default class DashboardDrawerNavigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NavigationContainer>
                <Drawer.Navigator>
                    <Drawer.Screen name='Workouts'>
                        {props => <WorkoutStackNavigator {...props} username={this.props.username}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name='Settings'>
                        {props => <Settings {...props} logout={this.props.logout}/>}
                    </Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}