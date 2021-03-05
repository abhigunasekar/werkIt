import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import Button from '../components/Button';
import styles from '../styles';

export default class WorkoutEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workoutName: this.props.route.params.workoutName,
            exercises: [],
        };
    }

    render() {
        return(
            <View style={styles.workoutEditorContainer}>
                <Text style={{marginTop: 20, fontSize: 20}}>{this.state.workoutName}</Text>
                <ScrollView style={styles.exerciseList} contentContainerStyle={{alignItems: 'center'}}>
                    <Text>Exercises go here</Text>
                    <Button
                        buttonText='Add new exercise'
                        style={{marginTop: 10}}
                        onPress={() => console.log('not yet implemented')}
                        orange={true}
                    />
                </ScrollView>
                <Button
                        buttonText='Submit'
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                        orange={true}
                    />
            </View>
        );
    }
}