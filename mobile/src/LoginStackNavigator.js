import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import CreateAccount from './screens/CreateAccount';

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
                    name='Login'
                >
                    {props => <Login {...props} login={this.props.login} />}
                </Stack.Screen>
                <Stack.Screen 
                    name='CreateAccount'
                    component={CreateAccount}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
    }
}