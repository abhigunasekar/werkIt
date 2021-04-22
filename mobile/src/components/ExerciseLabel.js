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
        let multiplier = 0;
        if (this.props.sets !== 0) {
            label += '     Sets: ';
            label += this.props.sets;
            label += '\n';
            multiplier++;
        }
        if (this.props.reps !== 0) {
            label += '     Reps: ';
            label += this.props.reps;
            label += '\n';
            multiplier++;
        }
        if (this.props.weight !== 0) {
            label += '     Weight: ';
            label += this.props.weight;
            label += '\n';
            multiplier++;
        }
        if (this.props.duration !== 0) {
            label += '     Duration: ';
            label += this.props.duration;
            label += '\n';
            multiplier++;
        }
        if (this.props.distance !== 0) {
            label += '     Distance: ';
            label += this.props.distance;
            label += '\n';
            multiplier++;
        }
        if (this.props.pace !== 0) {
            label += '     Pace: ';
            label += this.props.pace;
            label += '\n';
            multiplier++;
        }
        if (this.props.incline !== 0) {
            label += '     Incline: ';
            label += this.props.incline;
            label += '\n';
            multiplier++;
        }
        if (this.props.laps !== 0) {
            label += '     Laps: ';
            label += this.props.laps;
            label += '\n';
            multiplier++;
        }
        label = label.slice(0, -1);
        
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
                containerStyle={{backgroundColor: this.props.darkmode ? '#7E7E7E' : '#FFFFFF', width: '75%'}}
                title={
                    <View style={{flexDirection: 'row', marginLeft: 7}}>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000', fontWeight: 'bold', marginTop: multiplier*5}}>{this.props.name}</Text>
                        <Text style={{color: this.props.darkmode ? '#FFFFFF' : '#000000'}}>{label}</Text>
                    </View>
                }
            />
        );
    }
}