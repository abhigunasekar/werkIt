import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';

import HideableView from './HideableView';

import styles from '../styles';

export default class ExerciseLabel extends Component {
    constructor(props) {
        super(props);

        console.log('props sets: ' + this.props.sets);
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
        return (
            <Pressable style={{borderColor: '#000000', borderWidth: 3, width: '100%', marginBottom: 7}} onPress={() => this.props.edit(this.state)}>
                <Text>{this.props.name}</Text>
                <View style={styles.metadataList}>
                    <HideableView
                        key='Set'
                        name='Sets: '
                        value={(this.state.sets != undefined) ? this.state.sets : ''}
                        update={(e) => {
                            console.log('tried');
                            this.props.edit('Sets', e)
                        }}
                        visible={this.state.sets}
                    />
                    <HideableView
                        key='Rep'
                        name='Reps: '
                        value={(this.state.reps != undefined) ? this.state.reps : ''}
                        update={(e) => this.props.edit('Reps', e)}
                        visible={this.state.reps}
                    />
                    <HideableView
                        key='Weight'
                        name='Weight: '
                        style={{width: 60}}
                        value={(this.state.weight != undefined) ? this.state.weight : ''}
                        update={(e) => this.props.edit('Weight', e)}
                        visible={this.state.weight}
                    />
                    <HideableView
                        key='Duration'
                        name='Duration: '
                        style={{width: 60}}
                        value={(this.state.duration != undefined) ? this.state.duration : ''}
                        update={(e) => this.props.edit('Duration', e)}
                        visible={this.state.duration}
                    />
                    <HideableView
                        key='Distance'
                        name='Distance: '
                        style={{width: 60}}
                        value={(this.state.distance != undefined) ? this.state.distance : ''}
                        update={(e) => this.props.edit('Duration', e)}
                        visible={this.state.distance}
                    />
                    <HideableView
                        key='Pace'
                        name='Pace: '
                        value={(this.state.pace != undefined) ? this.state.pace : ''}
                        update={(e) => this.props.edit('Pace', e)}
                        visible={this.state.pace}
                    />
                    <HideableView
                        key='Incline'
                        name='Incline: '
                        value={(this.state.incline != undefined) ? this.state.incline : ''}
                        update={(e) => this.props.edit('Incline', e)}
                        visible={this.state.incline}
                    />
                    <HideableView
                        key='Laps'
                        name='Laps: '
                        value={(this.state.laps != undefined) ? this.state.laps : ''}
                        update={(e) => this.props.edit('Laps', e)}
                        visible={this.state.laps}
                    />
                </View>
            </Pressable>
        );
    }
}