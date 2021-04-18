import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

import HideableView from './HideableView';

export default class ExerciseLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            completed: false
        }
    }

    render() {
        let label = '';
        if (this.props.sets !== undefined) {
            label += '     Sets: ';
            label += this.props.sets
        }
        if (this.props.reps !== undefined) {
            label += '     Reps: ';
            label += this.props.reps;
        }
        if (this.props.weight !== undefined) {
            label += '     Weight: ';
            label += this.props.weight;
        }
        if (this.props.duration !== undefined) {
            label += '     Duration: ';
            label += this.props.duration;
        }
        if (this.props.distance !== undefined) {
            label += '     Distance: ';
            label += this.props.distance;
        }
        if (this.props.pace !== undefined) {
            label += '     Pace: ';
            label += this.props.pace;
        }
        if (this.props.incline !== undefined) {
            label += '     Incline: ';
            label += this.props.incline;
        }
        if (this.props.laps !== undefined) {
            label += '     Laps: ';
            label += this.props.laps;
        }
        console.log(label);
        return (
            <CheckBox
                containerStyle={{width: '90%'}}
                checked={this.state.completed}
                onPress={() => {
                    if (!this.state.completed) {
                        this.props.complete(this.props.name);
                        this.setState({ completed: true });
                    }
                }}
                containerStyle={{backgroundColor: this.props.darkmode ? '#7E7E7E' : '#FFFFFF'}}
                title={
                    <View style={{flexDirection: 'row', marginLeft: 7}}>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', fontWeight: 'bold'}}>{this.props.name}</Text>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}>{label}</Text>
                    </View>
                }
            />
        );
    }
}