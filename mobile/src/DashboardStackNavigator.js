import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './screens/Dashboard';
import WorkoutEditor from './screens/WorkoutEditor';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator
            >
                <Stack.Screen 
                    name='Dashboard'
                    component={Dashboard}
                    options={{ 
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