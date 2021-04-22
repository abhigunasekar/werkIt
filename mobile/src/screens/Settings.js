import React, { Component } from 'react';
import { View, Text, Switch, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


import Button from '../components/Button';

import * as serverMethods from '../ServerMethods';
import dark from '../dark';
import light from '../light';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            darkMode: this.props.darkmode,
        }
    }

    render() {
        return(
            <View style={this.props.darkmode ? dark.friendsContainer : light.friendsContainer}>
                <View style={this.props.darkmode ? dark.friendsHeader : light.friendsHeader}>
                    <Pressable style={{marginLeft: 17, marginRight: 110}} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="home" size={24} color="white" />
                    </Pressable>
                    <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: '500'}}>Settings</Text>
                </View>
                {/* <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}>Settings for {this.props.username}</Text> */}
                {/* <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 50}}>Do we want to put user info here?</Text> */}
                <View style={{flexDirection: 'row', marginTop: 50}}>
                    <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', marginTop: 5}}>Dark Mode: </Text>
                    <Switch
                        trackColor={{ true: "#7E7E7E" }}
                        thumbColor={this.props.darkmode ? "#7641BD" : "#3E3E3E"}
                        ios_backgroundColor="#7641BD"
                        onValueChange={() => {
                            serverMethods.updateDarkmode(this.props.username);
                            this.props.updateDarkmode();
                            //do i even need darkmode state lmao
                            //this.setState({ darkMode: !this.state.darkMode })
                        }}
                        //add server call to update status of darkmode
                        //potentially need to pass down a function to update darkmode in App.js
                        value={this.props.darkmode}
                    />
                </View>
                {/* <Button
                    buttonText='Log out'
                    onPress={() => this.props.logout()}
                    style={{marginTop: 50}}
                    darkmode={this.props.darkmode}
                    orange={true}
                /> */}
            </View>
        );
    }
}