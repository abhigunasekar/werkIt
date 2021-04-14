import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

export default class WorkoutTracker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workout: '',
            exercises: [],
            time: '',
        }
    }

    componentDidMount() {
        //server call to get information about the workout
    }

    render() {
        return(
            <View>
                <ScrollView>
                    <Text>Workout Tracker</Text>
                </ScrollView>
            </View>
        )
    }
}