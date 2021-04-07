import React, { Component } from 'react';
import { Pressable, Text, View, ScrollView, Modal } from 'react-native';

import HideableView from './HideableView';
import Button from './Button';

import styles from '../styles';
import { invalidFormAlert } from './Alerts';

export default class ExerciseLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sets: typeof (this.props.sets) !== 'string' ? '' : this.props.sets,
            reps: typeof (this.props.reps) !== 'string' ? '' : this.props.reps,
            weight: typeof (this.props.weight) !== 'string' ? '' : this.props.weight,
            duration: typeof (this.props.duration) !== 'string' ? '' : this.props.duration,
            distance: typeof (this.props.distance) !== 'string' ? '' : this.props.distance,
            pace: typeof (this.props.pace) !== 'string' ? '' : this.props.pace,
            incline: typeof (this.props.incline) !== 'string' ? '' : this.props.incline,
            laps: typeof (this.props.laps) !== 'string' ? '' : this.props.laps,
            setsVisible: this.props.sets,
            repsVisible: this.props.reps,
            weightVisible: this.props.weight,
            durationVisible: this.props.duration,
            distanceVisible: this.props.distance,
            paceVisible: this.props.pace,
            inclineVisible: this.props.incline,
            lapsVisible: this.props.laps,
            modalVisible: true,
        };

        this.checkFields = this.checkFields.bind(this);
    }

    checkFields() {
        let valid = false;

        if (this.state.setsVisible) {
            valid = (this.state.sets !== '');
        }

        if (this.state.repsVisible) {
            valid = (this.state.reps !== '');
        }

        if (this.state.weightVisible) {
            valid = (this.state.weight !== '');
        }

        if (this.state.durationVisible) {
            valid = (this.state.duration !== '');
        }

        if (this.state.distanceVisible) {
            valid = (this.state.distance !== '');
        }

        if (this.state.paceVisible) {
            valid = (this.state.pace !== '');
        }

        if (this.state.inclineVisible) {
            valid = (this.state.incline !== '');
        }

        if (this.state.lapsVisible) {
            valid = (this.state.laps !== '');
        }

        return valid;
    }

    render() {
        // change this to hold hideable views in modal
        //console.log(typeof (this.state.sets))
        console.log(this.state.sets)

        let counter = 0;
        if (this.state.setsVisible) {
            counter++;
        }

        if (this.state.repsVisible) {
            counter++;
        }

        if (this.state.weightVisible) {
            counter++;
        }

        if (this.state.durationVisible) {
            counter++;
        }

        if (this.state.distanceVisible) {
            counter++;
        }

        if (this.state.paceVisible) {
            counter++;
        }

        if (this.state.inclineVisible) {
            counter++;
        }

        if (this.state.lapsVisible) {
            counter++;
        }
        console.log(counter)
        let width = '' + (9 - counter) + '0%'
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