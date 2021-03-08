import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';

import HideableView from './HideableView';

import styles from '../styles';

export default class ExerciseLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            sets: this.props.sets,
            reps: this.props.reps,
            weight: this.props.weight,
            duration: this.props.duration,
            distance: this.props.distance,
            pace: this.props.pace,
            incline: this.props.incline,
        };

        this.updateSets = this.updateSets.bind(this);
        this.updateReps = this.updateReps.bind(this);
        this.updateWeight = this.updateWeight.bind(this);
        this.updateDuration = this.updateDuration.bind(this);
        this.updateDistance = this.updateDistance.bind(this);
        this.updatePace = this.updatePace.bind(this);
        this.updateIncline = this.updateIncline.bind(this);
    }

    updateSets(e) {
        this.setState({ sets: e.nativeEvent.text });
    }

    updateReps(e) {
        this.setState({ reps: e.nativeEvent.text });
    }

    updateWeight(e) {
        this.setState({ weight: e.nativeEvent.text });
    }

    updateDuration(e) {
        this.setState({ duration: e.nativeEvent.text });
    }

    updateDistance(e) {
        this.setState({ distance: e.nativeEvent.text });
    }

    updatePace(e) {
        this.setState({ pace: e.nativeEvent.text });
    }

    updateIncline(e) {
        this.setState({ incline: e.nativeEvent.text });
    }

    render() {
        let metadata = [];
        metadata.push(<HideableView key='Set' name='Sets: ' value={this.state.sets} update={(e) => this.updateSets(e)} visible={this.state.sets}/>);
        metadata.push(<HideableView key='Rep' name='Reps: ' value={this.state.reps} update={(e) => this.updateReps(e)} visible={this.state.reps}/>)
        metadata.push(<HideableView key='Weight' name='Weight: ' value={this.state.weight} update={(e) => this.updateWeight(e)} visible={this.state.weight}/>)
        metadata.push(<HideableView key='Duration' name='Duration: ' style={{width: 60}} value={this.state.duration} update={(e) => this.updateDuration(e)} visible={this.state.duration}/>)
        metadata.push(<HideableView key='Distance' name='Distance: ' style={{width: 60}} value={this.state.distance} update={(e) => this.updateDistance(e)} visible={this.state.distance}/>)
        metadata.push(<HideableView key='Pace' name='Pace: ' value={this.state.pace} update={(e) => this.updatePace(e)} visible={this.state.pace}/>)
        metadata.push(<HideableView key='Incline' name='Incline: ' value={this.state.incline} update={(e) => this.updateIncline(e)} visible={this.state.incline}/>)

        return (
            <Pressable style={{borderColor: '#000000', /*borderWidth: 3,*/ width: '100%', marginBottom: 7}} onPress={() => console.log(this.state)}>
                <Text>{this.props.name}</Text>
                <View style={styles.metadataList}>
                    {metadata}
                </View>
            </Pressable>
        );
    }
}