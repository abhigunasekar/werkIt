import React, { Component } from 'react';
import { Pressable } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';


import Dashboard from '../screens/Dashboard';

const Stack = createStackNavigator();

export default class DashboardStackNavigator extends Component {
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
                        headerLeft: () => 
                        <Pressable style={{marginLeft: 17}} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="home" size={24} color="white" />
                        </Pressable>
                    }}
                >
                    {props => <Dashboard {...props} logout={this.props.logout} username={this.props.username}/>}
                </Stack.Screen>
            </Stack.Navigator>
        );
    }
}