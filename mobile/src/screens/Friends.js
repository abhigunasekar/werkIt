import React, { Component } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import Button from '../components/Button';
import Textbox from '../components/TextBox';

export default class Friends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: []
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
                    buttonText={this.state.friends[i].name}
                    purple={true}
                />
            )
        }

        return (
            <View style={{alignItems: 'center', marginTop: 30}}>
                <View style={{borderBottomWidth: 2, width: '100%', alignItems: 'center', paddingBottom: 15, marginBottom: 30, flexDirection: 'row'}}>
                    <Pressable style={{marginLeft: 17, marginRight: 105}} onPress={() => this.props.navigation.openDrawer()}>
                            <FontAwesome name="home" size={24} color="white" />
                        </Pressable>
                    <Text>FRIENDS LIST</Text>
                </View>
                {/* search box */}
                <View style={{flexDirection: 'row', marginBottom: 20}}>
                <Textbox
                    style={{width: '50%'}}
                    placeholder='Username'
                    //after submit username, error check to see if friend exists
                />
                <Button
                    buttonText='Add Friend'
                    style={{marginLeft: 30, marginTop: 2}}
                    purple={true}
                />
                </View>
                <ScrollView style={{width: '80%', height: '70%'}} contentContainerStyle={{alignItems: 'center'}}>
                    {(friendsList.length === 0) ? <Text>Add some friends!</Text> : friendsList}
                </ScrollView>
            </View>
        );
    }
}