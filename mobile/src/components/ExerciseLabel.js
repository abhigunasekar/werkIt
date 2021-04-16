import React, { Component } from 'react';
import { View, Text } from 'react-native';

import HideableView from './HideableView';

export default class ExerciseLabel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text>{this.props.name}</Text>
                <HideableView
                    name='Sets: '
                    value={this.props.sets.toString()}
                    darkmode={this.props.darkmode}
                    editable={false}
                    //style={{width: 60}}
                    visible={this.props.sets !== undefined}
                />
                <HideableView
                    name='Reps: '
                    value={this.props.reps?.toString()}
                    darkmode={this.props.darkmode}
                    editable={false}
                    //style={{width: 60}}
                    visible={this.props.reps !== undefined}
                />
                <HideableView
                    name='Weight: '
                    value={this.props.weight?.toString()}
                    darkmode={this.props.darkmode}
                    editable={false}
                    visible={this.props.weight !== undefined}
                />
                <HideableView
                    name='Duration: '
                    value={this.props.duration?.toString()}
                    darkmode={this.props.darkmode}
                    editable={false}
                    visible={this.props.duration !== undefined}
                />
                <HideableView
                    name='Distance: '
                    value={this.props.distance?.toString()}
                    darkmode={this.props.darkmode}
                    editable={false}
                    visible={this.props.distance !== undefined}
                />
                <HideableView
                    name='Pace: '
                    value={this.props.pace?.toString()}
                    darkmode={this.props.darkmode}
                    editable={false}
                    visible={this.props.pace !== undefined}
                />
                <HideableView 
                    name='Incline: '
                    value={this.props.incline?.toString()}
                    darkmode={this.props.darkmode}
                    editable={false}
                    visible={this.props.incline !== undefined}
                />
                <HideableView
                    name='Laps: '
                    value={this.props.laps?.toString()}
                    darkmode={this.props.darkmode}
                    editable={false}
                    visible={this.props.laps !== undefined}
                />
            </View>
        );
    }
}