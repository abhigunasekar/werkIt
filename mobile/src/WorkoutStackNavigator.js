import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './screens/Dashboard';
import WorkoutEditor from './screens/WorkoutEditor';

import Button from './components/Button';

const Stack = createStackNavigator();

export default class StackNavigator extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <Stack.Navigator>
                <Stack.Screen 
                    name='Dashboard'
                    options={{
                        headerStyle: {
                            backgroundColor: '#7641BD',
                        },
                        headerTitleStyle: {
                            color: '#FFFFFF',
                        },
                    }}
                >
                    {props => <Dashboard {...props} logout={this.props.logout} username={this.props.username}/>}
                </Stack.Screen>
                <Stack.Screen 
                    name='WorkoutEditor'
                    component={WorkoutEditor}
                    options={{
                        gestureEnabled: false,
                        headerLeft: null,
                        headerStyle: {
                            backgroundColor: '#FB963C',
                        },
                        headerTitleStyle: {
                            color: '#FFFFFF',
                        },
                    }}
                />
            </Stack.Navigator>
        );
    }
}