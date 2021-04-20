import React, { Component } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../components/Button';
import Textbox from '../components/TextBox';
import * as serverMethods from '../ServerMethods';
import { friendExistsError, friendDNEError } from '../components/Alerts';

import light from '../light';
import dark from '../dark';

export default class Friends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            friends: [],
            new_friend: '',
            modalVisible: false,
        };

        this.check_friend = this.check_friend.bind(this);
    }
    
    componentDidMount() {
        //server call to get friends list
        console.log("getting friends");
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
            if (f.localeCompare(this.state.new_friend) == 0) {
                console.log("friend already added");
                return false
            }
        }
        console.log("new friend: " + this.state.new_friend);
        var body = { "friend_user": this.state.new_friend};
        serverMethods.addFriend(this.state.username, body)
            .then(response => {
                if (response.status == 400) {
                    friendDNEError(this.state.new_friend);
                } else if (response.status == 401) {
                    friendExistsError(this.state.new_friend);
                } else {
                    console.log("yay new friend");
                    serverMethods.getFriends(this.state.username)
                    .then(response => response.json())
                    .then(response => {
                        this.setState({friends: response})
                    });
                }
            });
        
    }

    render() {
        let friendsList = [];
        
        for (let i = 0; i < this.state.friends.length; i++) {
            friendsList.push(
                <Button
                    key={i}
                    buttonText={this.state.friends[i].name}
                    onPress={() => this.setState({ modalVisible: true })}
                    darkmode={this.props.darkmode}
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
                    onChangeText={(text) => this.setState({ new_friend: text })}
                    //after submit username, error check to see if friend exists
                />
                <Button
                    buttonText='Add Friend'
                    style={{marginLeft: 30, marginTop: 2}}
                    darkmode={this.props.darkmode}
                    purple={true}
                    onPress={() => this.check_friend()}
                />
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={this.props.darkmode ? dark.centeredView : light.centeredView}>
                        <View style={this.props.darkmode ? dark.modalView : light.modalView}>
                            <Button
                                buttonText='Send workout plan'
                                onPress={() => this.setState({ modalVisible: false })}
                                darkmode={this.props.darkmode}
                                purple
                            />
                            <Button
                                buttonText='Send fitness challenge'
                                onPress={() => this.setState({ modalVisible: false })}
                                darkmode={this.props.darkmode}
                                purple
                            />
                            <Button
                                buttonText='Cancel'
                                onPress={() => this.setState({ modalVisible: false })}
                                darkmode={this.props.darkmode}
                                gray
                            />

                        </View>
                    </View>
                </Modal>
                </View>
                <ScrollView style={{width: '80%', height: '70%'}} contentContainerStyle={{alignItems: 'center'}}>
                    {(friendsList.length === 0) ? <Text style={this.props.darkmode ? dark.text : light.text}>Add some friends!</Text> : friendsList}
                </ScrollView>
            </View>
        );
    }
}