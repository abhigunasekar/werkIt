import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import Button from '../components/Button';
import HideableView from '../components/HideableView';

import styles from '../styles';

export default class WorkoutEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            workoutName: this.props.route.params.workoutName,
            exercises: [],
        };
    }

    componentWillMount() {
        console.log('component will mount')
        //code to load exercises into the array based on workoutName
        this.state.exercises.push('Exercise 1');
        this.state.exercises.push('Exercise 2');
        this.state.exercises.push('Exercise 3');
        console.log(this.state.exercises.length)
    }

    render() {
        let exerciseList = [];
        console.log('render');
        for (let i = 0; i < this.state.exercises.length; i++) {
            console.log('haha');
            exerciseList.push(<HideableView name={this.state.exercises[i]} visible={true}/>);
        }
        return(
            <View style={styles.workoutEditorContainer}>
                <Text style={{marginTop: 20, fontSize: 20}}>{this.state.workoutName}</Text>
                <ScrollView style={styles.exerciseList} contentContainerStyle={{alignItems: 'center'}}>
                    {exerciseList}
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