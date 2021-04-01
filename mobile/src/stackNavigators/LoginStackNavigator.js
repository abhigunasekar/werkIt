import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import ChangePassword from '../screens/ChangePassword';

const Stack = createStackNavigator();

export default class StackNavigator extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen 
                    name='Login'
                >
                    {props => <Login {...props} login={this.props.login} persist={this.props.persist}/>}
                </Stack.Screen>
                <Stack.Screen 
                    name='CreateAccount'
                    options={{ gestureEnabled: false }}
                >
                    {props => <CreateAccount {...props} login={this.props.login} />}
                </Stack.Screen>
                <Stack.Screen
                    name='ChangePassword'
                    component={ChangePassword}
                    options={{ gestureEnabled: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
    }
}