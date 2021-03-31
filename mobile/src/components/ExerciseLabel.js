import React, { Component } from 'react';
import { Pressable, Text, View, ScrollView } from 'react-native';

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
            laps: this.props.laps,
        };
    }

    render() {
        let counter = 0;
        let array = [this.state.sets, this.state.reps, this.state.weight, this.state.duration, this.state.distance, this.state.pace, this.state.incline, this.state.laps]
        array.forEach(element => {
            if (element) {
                counter++;
            }
        });
        let width = counter * 110;
        return (
            <Pressable style={{borderColor: '#000000', /*borderWidth: 3,*/ width: '100%', marginBottom: 7}} onPress={() => this.props.edit(this.state)}>
                <Text>{this.props.name}</Text>
                <ScrollView style={{borderWidth: 1, margin: 10, width: width}}horizontal={true} bounces={false} contentContainerStyle={[{width: width}, styles.metadataList]}>
                    <HideableView
                        key='Set'
                        name='Sets: '
                        value={this.state.sets}
                        update={(e) => {
                            console.log('tried');
                            this.props.edit('Sets', e)
                        }}
                        maxLength={2}
                        visible={this.state.sets}
                    />
                    <HideableView
                        key='Rep'
                        name='Reps: '
                        value={this.state.reps}
                        update={(e) => this.props.edit('Reps', e)}
                        maxLength={2}
                        visible={this.state.reps}
                    />
                    <HideableView
                        key='Weight'
                        name='Weight: '
                        style={{width: 60}}
                        value={this.state.weight}
                        update={(e) => this.props.edit('Weight', e)}
                        maxLength={3}
                        visible={this.state.weight}
                    />
                    <HideableView
                        key='Duration'
                        name='Duration: '
                        style={{width: 60}}
                        value={this.state.duration}
                        update={(e) => this.props.edit('Duration', e)}
                        maxLength={3}
                        visible={this.state.duration}
                    />
                    <HideableView
                        key='Distance'
                        name='Distance: '
                        style={{width: 60}}
                        value={this.state.distance}
                        update={(e) => this.props.edit('Duration', e)}
                        //maxLength={ /* add a check for . and set max length based on  */}
                        visible={this.state.distance}
                    />
                    <HideableView
                        key='Pace'
                        name='Pace: '
                        value={this.state.pace}
                        update={(e) => this.props.edit('Pace', e)}
                        maxLength={2}
                        visible={this.state.pace}
                    />
                    {/* This is not in planning doc */}
                    <HideableView 
                        key='Incline'
                        name='Incline: '
                        value={this.state.incline}
                        update={(e) => this.props.edit('Incline', e)}
                        maxLength={2}
                        visible={this.state.incline}
                    />
                    <HideableView
                        key='Laps'
                        name='Laps: '
                        value={this.state.laps}
                        update={(e) => this.props.edit('Laps', e)}
                        maxLength={2}
                        visible={this.state.laps}
                    />
                </ScrollView>
            </Pressable>
        );
    }
}