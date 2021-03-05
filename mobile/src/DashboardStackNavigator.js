import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
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
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen 
                        name='Dashboard'
                        component={Dashboard}
                        options={{
                            headerRight: () => (<Button
                                buttonText='Log out'
                                onPress={() => this.props.logout()}
                                style={{marginRight: 20}}
                                orange={true}
                            />), 
                            headerStyle: {
                                backgroundColor: '#7641BD',
                            },
                            headerTitleStyle: {
                                color: '#FFFFFF',
                            },
                        }}
                    />
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
            </NavigationContainer>
        );
    }
}