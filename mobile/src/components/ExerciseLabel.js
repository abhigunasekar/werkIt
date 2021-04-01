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
            modalVisible: false,
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
        return (
            <View style={{marginBottom: 15}}>
                <Button
                    buttonText={this.props.name}
                    onPress={() => this.setState({ modalVisible: true })}
                    style={{width: 225}}
                    orange={true}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.metadataModal}>
                            <ScrollView>
                                <HideableView
                                    key='Set'
                                    name='Sets: '
                                    value={this.state.sets}
                                    update={(e) => {
                                        console.log('tried');
                                        this.props.edit('Sets', e);
                                        this.setState({ sets: e });
                                    }}
                                    maxLength={2}
                                    visible={this.state.setsVisible}
                                />
                                <HideableView
                                    key='Rep'
                                    name='Reps: '
                                    value={this.state.reps}
                                    update={(e) => {
                                        this.props.edit('Reps', e);
                                        this.setState({ reps: e });
                                    }}
                                    maxLength={2}
                                    visible={this.state.repsVisible}
                                />
                                <HideableView
                                    key='Weight'
                                    name='Weight: '
                                    value={this.state.weight}
                                    update={(e) => {
                                        this.props.edit('Weight', e);
                                        this.setState({ weight: e })
                                    }}
                                    maxLength={3}
                                    visible={this.state.weightVisible}
                                />
                                <HideableView
                                    key='Duration'
                                    name='Duration: '
                                    value={this.state.duration}
                                    update={(e) => {
                                        this.props.edit('Duration', e);
                                        this.setState({ duration: e });
                                    }}
                                    maxLength={3}
                                    visible={this.state.durationVisible}
                                />
                                <HideableView
                                    key='Distance'
                                    name='Distance: '
                                    style={{width: 60}}
                                    value={this.state.distance}
                                    update={(e) => {
                                        this.props.edit('Duration', e);
                                        this.setState({ distance: e });
                                    }}
                                    //maxLength={ /* add a check for . and set max length based on  */}
                                    visible={this.state.distanceVisible}
                                />
                                <HideableView
                                    key='Pace'
                                    name='Pace: '
                                    value={this.state.pace}
                                    update={(e) => {
                                        this.props.edit('Pace', e);
                                        this.setState({ pace: e });
                                    }}
                                    maxLength={2}
                                    visible={this.state.paceVisible}
                                />
                                {/* This is not in planning doc */}
                                <HideableView 
                                    key='Incline'
                                    name='Incline: '
                                    value={this.state.incline}
                                    update={(e) => {
                                        this.props.edit('Incline', e);
                                        this.setState({ incline: e });
                                    }}
                                    maxLength={2}
                                    visible={this.state.inclineVisible}
                                />
                                <HideableView
                                    key='Laps'
                                    name='Laps: '
                                    value={this.state.laps}
                                    update={(e) => {
                                        this.props.edit('Laps', e);
                                        this.setState({ laps: e });
                                    }}
                                    maxLength={2}
                                    visible={this.state.lapsVisible}
                                />
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15, borderTopWidth: 2}}>
                                    <Button
                                        buttonText='Delete'
                                        onPress={() => {
                                            this.props.delete(this.props.name);
                                            this.setState({ modalVisible: false });
                                        }}
                                        gray={true}
                                    />
                                    <Button
                                        buttonText='Submit'
                                        onPress={() => {
                                            if (this.checkFields()) {
                                                this.setState({ modalVisible: false });
                                            } else {
                                                invalidFormAlert();
                                            }
                                        }} //error checking that all boxes are filled
                                        orange={true}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>

            
        );
    }
}