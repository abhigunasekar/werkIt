import React, { Component } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DashboardStackNavigator from './stackNavigators/DashboardStackNavigator';
import WorkoutPlanStackNavigator from './stackNavigators/WorkoutPlanStackNavigator';
import WorkoutStackNavigator from './stackNavigators/WorkoutStackNavigator';
import Settings from './screens/Settings';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label='Logout'
                icon={() => <MaterialCommunityIcons name="logout" color='#FB963C' size={26} />}
                labelStyle={{color: '#FB963C'}}
                onPress={() => {
                    props.navigation.closeDrawer();
                    setTimeout(() => props.logout(), 500);
                }}
            />
        </DrawerContentScrollView>
      );    
}

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NavigationContainer>
                <Drawer.Navigator initialRouteName='Dashboard' drawerContent={props => <CustomDrawerContent {...props} logout={this.props.logout}/>}>  
                    <Drawer.Screen name='Dashboard'>
                        {props => <DashboardStackNavigator {...props} logout={this.props.logout} username={this.props.username}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name='Workout Plans'>
                        {props => <WorkoutPlanStackNavigator {...props} username={this.props.username}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name='Workouts'>
                        {props => <WorkoutStackNavigator {...props} username={this.props.username}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name='Settings'>
                        {props => <Settings {...props} logout={this.props.logout}/>}
                    </Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}