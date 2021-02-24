import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './screens/Dashboard';
import WorkoutEditor from './screens/WorkoutEditor';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name='Dashboard'
                    component={Dashboard}
                />
                <Stack.Screen 
                    name='WorkoutEditor'
                    component={WorkoutEditor}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}