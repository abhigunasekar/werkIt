import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';

import HideableView from './HideableView';

import styles from '../styles';

export default class ExerciseLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            sets: this.props.sets,
            reps: this.props.reps,
            weight: this.props.weight,
            duration: this.props.duration,
            distance: this.props.distance,
            pace: this.props.pace,
            incline: this.props.incline,
        };
    }

    render() {
        let metadata = [];
        
        if (this.state.sets) {
            metadata.push(<HideableView name='Sets: ' value={this.props.value} visible={true}/>)
        }
        if (this.state.reps) {
            metadata.push(<HideableView name='Reps: ' value={this.props.value} visible={true}/>)
        }
        if (this.state.weight) {
            metadata.push(<HideableView name='Weight: ' value={this.props.value} visible={true}/>)
        }
        if (this.state.duration) {
            metadata.push(<HideableView name='Duration: ' style={{width: 60}} value={this.props.value} visible={true}/>)
        }
        if (this.state.distance) {
            metadata.push(<HideableView name='Distance: ' style={{width: 60}} value={this.props.value} visible={true}/>)
        }
        if (this.state.pace) {
            metadata.push(<HideableView name='Pace: ' value={this.props.value} visible={true}/>)
        }
        if (this.state.incline) {
            metadata.push(<HideableView name='Incline: ' value={this.props.value} visible={true}/>)
        }

        return (
            <Pressable style={{borderColor: '#000000', borderWidth: 3, width: '100%'}} onPress={() => console.log('pressed')}>
                <Text>{this.props.name}</Text>
                <View style={styles.metadataList}>
                    {metadata}
                </View>
            </Pressable>
        );
    }
}