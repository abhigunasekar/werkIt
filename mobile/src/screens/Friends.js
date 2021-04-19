import React, { Component } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../components/Button';
import Textbox from '../components/TextBox';
import * as serverMethods from '../ServerMethods';

import light from '../light';
import dark from '../dark';

export default class Friends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            friends: [],
            new_friend: ""
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.check_friend = this.check_friend.bind(this);
    }
    
    componentDidMount() {
        //server call to get friends list
        serverMethods.getFriends(this.state.username)
            .then(response => response.json())
            .then(response => {
                console.log("friends res:" + response);
                this.setState({ friends: response });
            });
        
    }

    check_friend() {
        // checks if the friend has already been added
        for (var f in this.state.friends) {
            if (f.localeCompare(new_friend) == 0) {
                console.log("friend already added");
                return false
            }
        }
        serverMethods.addFriend(this.state.username, this.state.new_friend)
            .then(response => response.json())
            .then(response => {
                console.log("yay new friend")
            });
    }

    handleInputChange(event) {
        console.log("here");
        console.log("event:" + event);
        this.setState({new_friend: event.target.value})
    }

    render() {
        let friendsList = [];
        
        for (let i = 0; i < this.state.friends.length; i++) {
            friendsList.push(
                <Button
                    key={i}
                    buttonText={this.state.friends[i]}
                    purple={true}
                />
            )
        }

        return (
            <View style={this.props.darkmode ? dark.friendsContainer : light.friendsContainer}>
                <View style={this.props.darkmode ? dark.friendsHeader : light.friendsHeader}>
                    <Pressable style={{marginLeft: 17, marginRight: 85}} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="home" size={24} color="white" />
                        </Pressable>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 24}}>Friends List</Text>
                </View>
                {/* search box */}
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Textbox
                    style={{width: '50%'}}
                    placeholder='Username'
                    darkmode={this.props.darkmode}
                    value={this.state.new_friend}
                    onChange={this.handleInputChange}
                    //after submit username, error check to see if friend exists
                />
                <Button
                    buttonText='Add Friend'
                    style={{marginLeft: 30, marginTop: 2}}
                    darkmode={this.props.darkmode}
                    purple={true}
                    onPress={this.check_friend}
                />
                </View>
                <ScrollView style={{width: '80%', height: '70%'}} contentContainerStyle={{alignItems: 'center'}}>
                    {(friendsList.length === 0) ? <Text style={this.props.darkmode ? dark.text : light.text}>Add some friends!</Text> : friendsList}
                </ScrollView>
            </View>
        );
    }
}