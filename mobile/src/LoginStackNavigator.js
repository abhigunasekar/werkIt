import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import CreateAccount from './screens/CreateAccount';
import ChangePassword from './screens/ChangePassword';

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
                    name='Login'
                >
                    {props => <Login {...props} login={this.props.login} />}
                </Stack.Screen>
                <Stack.Screen 
                    name='CreateAccount'
                    component={CreateAccount}
                    options={{ gestureEnabled: false }}
                />
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