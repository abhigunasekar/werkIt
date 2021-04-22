import React, { Component } from 'react';
import { Pressable, Text, View, ScrollView, Modal } from 'react-native';

import HideableView from './HideableView';
import Button from './Button';

import light from '../light';
import dark from '../dark';
import { invalidFormAlert } from './Alerts';

export default class ExerciseButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sets: ((typeof (this.props.sets) === 'boolean') || (this.props.sets === undefined)) ? '' : this.props.sets.toString(),
            reps: ((typeof (this.props.reps) === 'boolean') || (this.props.reps === undefined)) ? '' : this.props.reps.toString(),
            weight: ((typeof (this.props.weight) === 'boolean') || (this.props.weight === undefined)) ? '' : this.props.weight.toString(),
            duration: ((typeof (this.props.duration) === 'boolean') || (this.props.duration === undefined)) ? '' : this.props.duration.toString(),
            distance: ((typeof (this.props.distance) === 'boolean') || (this.props.distance === undefined)) ? '' : this.props.distance.toString(),
            pace: ((typeof (this.props.pace) === 'boolean') || (this.props.pace === undefined)) ? '' : this.props.pace.toString(),
            incline: ((typeof (this.props.incline) === 'boolean') || (this.props.incline === undefined)) ? '' : this.props.incline.toString(),
            laps: ((typeof (this.props.laps) === 'boolean') || (this.props.laps === undefined)) ? '' : this.props.laps.toString(),
            setsVisible: this.props.sets,
            repsVisible: this.props.reps,
            weightVisible: this.props.weight,
            durationVisible: this.props.duration,
            distanceVisible: this.props.distance,
            paceVisible: this.props.pace,
            inclineVisible: this.props.incline,
            lapsVisible: this.props.laps,
            modalVisible: this.props.modalVisible,
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
        let width = '' + (9 - counter) + '0%'
        return (
            <View style={{marginBottom: 15}}>
                <Button
                    buttonText={this.props.name}
                    onPress={() => this.setState({ modalVisible: true })}
                    style={{width: 225}}
                    darkmode={this.props.darkmode}
                    orange={true}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={light.centeredView}>
                        <View style={[this.props.darkmode ? dark.metadataModal : light.metadataModal, {marginTop: width}]}>
                            <ScrollView>
                                <HideableView
                                    key='Set'
                                    name='Sets: '
                                    value={this.state.sets}
                                    defaultValue={this.state.sets}
                                    update={(e) => {
                                        this.props.edit('Sets', e);
                                        this.setState({ sets: e });
                                    }}
                                    maxLength={2}
                                    darkmode={this.props.darkmode}
                                    editable={true}
                                    visible={this.state.setsVisible}
                                />
                                <HideableView
                                    key='Rep'
                                    name='Reps: '
                                    value={this.state.reps}
                                    defaultValue={this.state.reps}
                                    update={(e) => {
                                        this.props.edit('Reps', e);
                                        this.setState({ reps: e });
                                    }}
                                    maxLength={2}
                                    darkmode={this.props.darkmode}
                                    editable={true}
                                    visible={this.state.repsVisible}
                                />
                                <HideableView
                                    key='Weight'
                                    name='Weight: '
                                    value={this.state.weight}
                                    defaultValue={this.state.weight}
                                    update={(e) => {
                                        this.props.edit('Weight', e);
                                        this.setState({ weight: e })
                                    }}
                                    maxLength={3}
                                    darkmode={this.props.darkmode}
                                    editable={true}
                                    visible={this.state.weightVisible}
                                />
                                <HideableView
                                    key='Duration'
                                    name='Duration: '
                                    value={this.state.duration}
                                    defaultValue={this.state.duration}
                                    update={(e) => {
                                        this.props.edit('Duration', e);
                                        this.setState({ duration: e });
                                    }}
                                    maxLength={3}
                                    darkmode={this.props.darkmode}
                                    editable={true}
                                    visible={this.state.durationVisible}
                                />
                                <HideableView
                                    key='Distance'
                                    name='Distance: '
                                    style={{width: 60}}
                                    value={this.state.distance}
                                    defaultValue={this.state.distance}
                                    update={(e) => {
                                        this.props.edit('Duration', e);
                                        this.setState({ distance: e });
                                    }}
                                    //maxLength={ /* add a check for . and set max length based on  */}
                                    darkmode={this.props.darkmode}
                                    editable={true}
                                    visible={this.state.distanceVisible}
                                />
                                <HideableView
                                    key='Pace'
                                    name='Pace: '
                                    value={this.state.pace}
                                    defaultValue={this.state.pace}
                                    update={(e) => {
                                        this.props.edit('Pace', e);
                                        this.setState({ pace: e });
                                    }}
                                    maxLength={2}
                                    darkmode={this.props.darkmode}
                                    editable={true}
                                    visible={this.state.paceVisible}
                                />
                                {/* This is not in planning doc */}
                                <HideableView 
                                    key='Incline'
                                    name='Incline: '
                                    value={this.state.incline}
                                    defaultValue={this.state.incline}
                                    update={(e) => {
                                        this.props.edit('Incline', e);
                                        this.setState({ incline: e });
                                    }}
                                    maxLength={2}
                                    darkmode={this.props.darkmode}
                                    editable={true}
                                    visible={this.state.inclineVisible}
                                />
                                <HideableView
                                    key='Laps'
                                    name='Laps: '
                                    value={this.state.laps}
                                    defaultValue={this.state.laps}
                                    update={(e) => {
                                        this.props.edit('Laps', e);
                                        this.setState({ laps: e });
                                    }}
                                    maxLength={2}
                                    darkmode={this.props.darkmode}
                                    editable={true}
                                    visible={this.state.lapsVisible}
                                />
                                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 15, borderTopWidth: 2}}>
                                    <Button
                                        buttonText='Delete'
                                        onPress={() => {
                                            this.props.delete(this.props.name);
                                            this.setState({ modalVisible: false });
                                        }}
                                        darkmode={this.props.darkmode}
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
                                        darkmode={this.props.darkmode}
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