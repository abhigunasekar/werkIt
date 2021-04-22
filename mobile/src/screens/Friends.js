import React, { Component } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../components/Button';
import Textbox from '../components/TextBox';
import * as serverMethods from '../ServerMethods';
import { friendExistsError, friendDNEError, workout_plan_sent, challenge_sent, pending_friend_alert } from '../components/Alerts';
import DropDownPicker from 'react-native-dropdown-picker';
import TextBox from '../components/TextBox';

import light from '../light';
import dark from '../dark';

export default class Friends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: this.props.username,
            friends: [],
            pending: [],
            new_friend: '',
            current_friend_selected: '',
            modalVisible1: false,
            modalVisibleSendPlan: false,
            modalVisibleSendChallenge: false,
            savedWorkoutPlans: [],
            challenges: 0,
            workout_to_send: ''
        };

        this.check_friend = this.check_friend.bind(this);
    }
    
    componentDidMount() {
        //server call to get friends list
        console.log("getting friends");
        serverMethods.getFriends(this.state.username)
            .then(response => response.json())
            .then(response => {
                console.log("friends res:" + JSON.stringify(response));
                var friend_list = [];
                var pending_list = [];
                for (var f of response) {
                    if (f.pending) {
                        pending_list.push(f);
                    } else {
                        friend_list.push(f);
                    }
                }
                this.setState({ friends: friend_list });
                this.setState({ pending: pending_list });
            });
        serverMethods.getUserWorkoutPlans(this.state.username)
            .then(response => response.json())
            .then(response => {
                let array = [];
                response.map((workoutPlan) => array.push({ label: workoutPlan, value: workoutPlan }))
                this.setState({ savedWorkoutPlans: array })
        });
        this.listener = this.props.navigation.addListener('focus', () =>
            serverMethods.getUserWorkoutPlans(this.state.username)
                .then(response => response.json())
                .then(response => {
                    let array = [];
                    response.map((workoutPlan) => array.push({ label: workoutPlan, value: workoutPlan }))
                    this.setState({ savedWorkoutPlans: array })
                }));
    }
    componentWillUnmount() {
        this.listener();
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
                        var friend_list = [];
                        var pending_list = [];
                        for (var f of response) {
                            if (f.pending) {
                                pending_list.push(f);
                            } else {
                                friend_list.push(f);
                            }
                        }
                        this.setState({ friends: friend_list });
                        this.setState({ pending: pending_list });
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
                    onPress={() => this.setState({ current_friend_selected:this.state.friends[i].username, modalVisible1: true })}
                    style={{marginBottom: 20}}
                    darkmode={this.props.darkmode}
                    purple={true}
                />
            )
        }

        let pendingList = [];
        
        for (let i = 0; i < this.state.pending.length; i++) {
            pendingList.push(
                <Button
                    key={i}
                    buttonText={this.state.pending[i].name}
                    onPress={() => pending_friend_alert(this.state.pending[i].name)}
                    style={{marginBottom: 20}}
                    darkmode={this.props.darkmode}
                    gray={true}
                />
            )
        }

        return (
            <View style={this.props.darkmode ? dark.friendsContainer : light.friendsContainer}>
                <View style={this.props.darkmode ? dark.friendsHeader : light.friendsHeader}>
                    <Pressable style={{marginLeft: 17, marginRight: 95}} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="home" size={24} color="white" />
                        </Pressable>
                    <Text style={{color: '#FFFFFF', fontWeight: '500', fontSize: 20}}>Friends List</Text>
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
                    visible={this.state.modalVisible1}
                >
                    <View style={this.props.darkmode ? dark.centeredView : light.centeredView}>
                        <View style={this.props.darkmode ? dark.modalView : light.modalView}>
                            <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}>Current friend selected: {this.state.current_friend_selected}</Text>
                            <Button
                                buttonText='Send workout plan'
                                onPress={() => this.setState({ modalVisible1: false, modalVisibleSendPlan: true })}
                                darkmode={this.props.darkmode}
                                purple
                            />
                            <Button
                                buttonText='Send fitness challenge'
                                onPress={() => this.setState({ modalVisible1: false, modalVisibleSendChallenge: true})}
                                darkmode={this.props.darkmode}
                                purple
                            />
                            <Button
                                buttonText='Cancel'
                                onPress={() => this.setState({ modalVisible1: false })}
                                darkmode={this.props.darkmode}
                                gray
                            />
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisibleSendPlan}
                >
                    <View style={this.props.darkmode ? dark.centeredView : light.centeredView}>
                        <View style={this.props.darkmode ? dark.modalView : light.modalView}>
                            <DropDownPicker
                                items={this.state.savedWorkoutPlans}
                                defaultValue={''}
                                placeholder='Select a workout to send'
                                containerStyle={{height: 40, width: '80%'}}
                                style={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                                itemStyle={{justifyContent: 'flex-start'}}
                                labelStyle={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}
                                dropDownStyle={{backgroundColor: this.props.darkmode ? '#6E6E6E' : '#FAFAFA'}}
                                arrowColor={this.props.darkmode ? '#FFFFFF' : '#000000'}
                                onChangeItem={(item) => this.setState({ workout_to_send:item.value })}
                            />
                            <Button
                                buttonText='Send'
                                darkmode={this.props.darkmode}
                                purple
                                onPress={() => {
                                    var request = {type: 'plan', plan: this.state.workout_to_send, friend: this.state.current_friend_selected}
                                    serverMethods.sendRequest(this.state.username, request)
                                        .then(response => {
                                            this.setState({ modalVisibleSendPlan: false })})
                                }}

                            />
                            <Button
                                buttonText='Cancel'
                                onPress={() => this.setState({ modalVisibleSendPlan: false })}
                                darkmode={this.props.darkmode}
                                purple
                            />
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={this.state.modalVisibleSendChallenge}
                >
                    <View style={this.props.darkmode ? dark.centeredView : light.centeredView}>
                        <View style={this.props.darkmode ? dark.modalView : light.modalView}>
                            <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}>Enter the number of workouts for friend to complete:</Text>
                            <TextBox
                                keyboardType='number-pad'
                                style={{marginTop: 20, alignItems: 'center'}}
                                style={[{width: 40, height: 40}, this.props.style]}
                                darkmode={this.props.darkmode}
                                value={this.state.name}
                                maxLength={2}
                                editable={this.props.editable}
                                onChangeText={(text) => this.setState({ challenges: text })}
                            />
                            <Button
                                buttonText='Send'
                                darkmode={this.props.darkmode}
                                purple
                                onPress={() => {
                                    var request = {type: 'challenge', num: parseInt(this.state.challenges), friend: this.state.current_friend_selected}
                                    serverMethods.sendRequest(this.state.username, request)
                                        .then(() => this.setState({ modalVisibleSendChallenge: false }))
                                }}
                            />
                            <Button
                                buttonText='Cancel'
                                onPress={() => this.setState({ modalVisibleSendChallenge: false })}
                                darkmode={this.props.darkmode}
                                purple
                            />
                        </View>
                    </View>
                </Modal>
                </View>
                <ScrollView style={{width: '80%', height: '70%'}} contentContainerStyle={{alignItems: 'center'}}>
                    {(friendsList.length === 0 && pendingList.length === 0) ? <Text style={this.props.darkmode ? dark.text : light.text}>Add some friends!</Text> : friendsList}
                    {(pendingList.length === 0) ? <Text style={this.props.darkmode ? dark.text : light.text}></Text> : pendingList}
                </ScrollView>
            </View>
        );
    }
}