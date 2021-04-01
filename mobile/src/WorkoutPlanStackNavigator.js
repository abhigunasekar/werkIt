import React, { Component } from 'react';
import { Pressable } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

import WorkoutPlans from './screens/WorkoutPlans';
import WorkoutPlanEditor from './screens/WorkoutPlanEditor';

const Stack = createStackNavigator();

export default class WorkoutPlanStackNavigator extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <Stack.Navigator>
                <Stack.Screen 
                    name='WorkoutPlans'
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
                    {props => <WorkoutPlans {...props} username={this.props.username}/>}
                </Stack.Screen>
                <Stack.Screen 
                    name='WorkoutPlanEditor'
                    component={WorkoutPlanEditor}
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