import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import Button from '../components/Button';

import styles from '../styles';

export default class Dashboard extends Component{
    constructor() {
        super();

        this.state = {
            workouts: [],
        };
    }

    render() {
        return(
            <View style={styles.dashboardContainer}>
                <Text style={styles.motivationalQuote}>Motivational Quote</Text>
                <ScrollView style={styles.workoutList}>
                    <Text>Workouts go here</Text>
                </ScrollView>
                <Button
                    buttonText='Create New Workout'
                    onPress={() => this.props.navigation.navigate('WorkoutEditor')}
                    purple={true}
                />
            </View>
        );
    }
}