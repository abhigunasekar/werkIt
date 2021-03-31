import React, { Component } from 'react';
import { Text, Pressable } from 'react-native';

export default class WorkoutLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
        }
    }

    render() {
        return(
            <Pressable style={{borderColor: '#000000', /*borderWidth: 3,*/ width: '100%', marginBottom: 7}} onPress={() => this.props.edit()}>
                <Text>{this.props.name}</Text>
            </Pressable>
        );
    }
}