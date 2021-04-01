import React, { Component } from 'react';
import { Pressable, Text, View, ScrollView, Modal } from 'react-native';

import HideableView from './HideableView';
import Button from './Button';

import styles from '../styles';

export default class ExerciseLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sets: this.props.sets,
            reps: this.props.reps,
            weight: this.props.weight,
            duration: this.props.duration,
            distance: this.props.distance,
            pace: this.props.pace,
            incline: this.props.incline,
            laps: this.props.laps,
            modalVisible: false,
        };
    }

    render() {
        // change this to hold hideable views in modal
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
                                    value={(typeof (this.state.sets) == Boolean) ? '' : this.state.sets}
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
                                    value={(typeof (this.state.reps) == Boolean) ? '' : this.state.reps}
                                    update={(e) => this.props.edit('Reps', e)}
                                    maxLength={2}
                                    visible={this.state.reps}
                                />
                                <HideableView
                                    key='Weight'
                                    name='Weight: '
                                    style={{width: 60}}
                                    value={(typeof (this.state.weight) == Boolean) ? '' : this.state.weight}
                                    update={(e) => this.props.edit('Weight', e)}
                                    maxLength={3}
                                    visible={this.state.weight}
                                />
                                <HideableView
                                    key='Duration'
                                    name='Duration: '
                                    style={{width: 60}}
                                    value={(typeof (this.state.duration) == Boolean) ? '' : this.state.duration}
                                    update={(e) => this.props.edit('Duration', e)}
                                    maxLength={3}
                                    visible={this.state.duration}
                                />
                                <HideableView
                                    key='Distance'
                                    name='Distance: '
                                    style={{width: 60}}
                                    value={(typeof (this.state.distance) == Boolean) ? '' : this.state.distance}
                                    update={(e) => this.props.edit('Duration', e)}
                                    //maxLength={ /* add a check for . and set max length based on  */}
                                    visible={this.state.distance}
                                />
                                <HideableView
                                    key='Pace'
                                    name='Pace: '
                                    value={(typeof (this.state.pace) == Boolean) ? '' : this.state.pace}
                                    update={(e) => this.props.edit('Pace', e)}
                                    maxLength={2}
                                    visible={this.state.pace}
                                />
                                {/* This is not in planning doc */}
                                <HideableView 
                                    key='Incline'
                                    name='Incline: '
                                    value={(typeof (this.state.incline) == Boolean) ? '' : this.state.incline}
                                    update={(e) => this.props.edit('Incline', e)}
                                    maxLength={2}
                                    visible={this.state.incline}
                                />
                                <HideableView
                                    key='Laps'
                                    name='Laps: '
                                    value={(typeof (this.state.laps) == Boolean) ? '' : this.state.laps}
                                    update={(e) => this.props.edit('Laps', e)}
                                    maxLength={2}
                                    visible={this.state.laps}
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
                                        onPress={() => this.setState({ modalVisible: false })}
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