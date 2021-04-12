import React, { Component } from 'react';
import { Pressable } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import Workouts from '../screens/Workouts';
import WorkoutEditor from '../screens/WorkoutEditor';

const Stack = createStackNavigator();

export default class WorkoutStackNavigator extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <Stack.Navigator>
                <Stack.Screen 
                    name='Workouts'
                    options={{
                        headerStyle: { backgroundColor: '#7641BD' },
                        headerTitleStyle: { color: '#FFFFFF' },
                        headerLeft: () => 
                        <Pressable style={{marginLeft: 17}} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="home" size={24} color='#FFFFFF' />
                        </Pressable>
                    }}
                >
                    {props => <Workouts {...props} logout={this.props.logout} username={this.props.username} darkmode={this.props.darkmode}/>}
                </Stack.Screen>
                <Stack.Screen 
                    name='WorkoutEditor'
                    options={{
                        gestureEnabled: false,
                        headerLeft: null,
                        headerStyle: { backgroundColor: '#FB963C' },
                        headerTitleStyle: { color: '#FFFFFF' },
                    }}
                >
                    {props => <WorkoutEditor {...props} darkmode={this.props.darkmode}/>}
                </Stack.Screen>
            </Stack.Navigator>
        );
    }
}