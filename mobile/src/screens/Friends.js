import React, { Component } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../components/Button';
import Textbox from '../components/TextBox';

import light from '../light';
import dark from '../dark';

export default class Friends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: [],
            modalVisible: false,
        };
    }
    
    componentDidMount() {
        //server call to get friends list
    }

    render() {
        let friendsList = [];
        
        for (let i = 0; i < this.state.friends; i++) {
            friendsList.push(
                <Button
                    buttonText={this.state.friends[i]}
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
                    //after submit username, error check to see if friend exists
                />
                <Button
                    buttonText='Add Friend'
                    style={{marginLeft: 30, marginTop: 2}}
                    darkmode={this.props.darkmode}
                    purple={true}
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