import React, { Component } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DashboardStackNavigator from './stackNavigators/DashboardStackNavigator';
import WorkoutPlanStackNavigator from './stackNavigators/WorkoutPlanStackNavigator';
import WorkoutStackNavigator from './stackNavigators/WorkoutStackNavigator';
import Friends from './screens/Friends';
import Settings from './screens/Settings';

import dark from './dark';
import light from './light';

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props} style={props.drawerStyle}>
            <DrawerItemList {...props} labelStyle={props.drawerItemStyle} />
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

        this.state = {
            style: this.props.darkmode ? dark : light,
        }
    }

    render() {
        return(
            <NavigationContainer>
                <Drawer.Navigator initialRouteName='Dashboard' drawerContent={props => <CustomDrawerContent {...props} drawerStyle={this.props.darkmode ? dark.drawer : light.drawer} drawerItemStyle={this.props.darkmode ? dark.drawerItem : light.drawerItem} logout={this.props.logout}/>}>  
                    <Drawer.Screen name='Dashboard'>
                        {props => <DashboardStackNavigator {...props} logout={this.props.logout} username={this.props.username} darkmode={this.props.darkmode}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name='Workout Plans'>
                        {props => <WorkoutPlanStackNavigator {...props} username={this.props.username} darkmode={this.props.darkmode}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name='Workouts'>
                        {props => <WorkoutStackNavigator {...props} username={this.props.username} darkmode={this.props.darkmode}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name='Friends'>
                        {props => <Friends {...props} username={this.props.username} darkmode={this.props.darkmode}/>}
                    </Drawer.Screen>
                    <Drawer.Screen name='Settings'>
                        {props => <Settings {...props} username={this.props.username} logout={this.props.logout} darkmode={this.props.darkmode} updateDarkmode={this.props.updateDarkmode}/>}
                    </Drawer.Screen>
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}