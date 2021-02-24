import React, { Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native'

export default class Dashboard extends Component{
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return(
            <ScrollView>
                <Text>Dashboard</Text>
            </ScrollView>
        );
    }
}