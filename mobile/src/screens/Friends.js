import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Button from '../components/Button';

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
            <View>
                <Text>FRIENDS LIST</Text>
                {/* search box */}
                <ScrollView>
                    {(friendsList.length === 0) ? <Text>Add some friends!</Text> : friendsList}
                </ScrollView>
            </View>
        );
    }
}