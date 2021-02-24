import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import Button from '../components/Button';

export default class Dashboard extends Component{
    constructor() {
        super();

        this.state = {

        };
    }

    render() {
        return(
            <ScrollView>
                <Text>Dashboard</Text>
                <Button
                    buttonText='Create New Workout'
                    onPress={() => this.props.navigation.navigate('WorkoutEditor')}
                />
            </ScrollView>
        );
    }
}