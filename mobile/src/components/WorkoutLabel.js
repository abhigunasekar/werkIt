import React, { Component } from 'react';
import { View, Text, Pressable } from 'react-native';
import Button from './Button';

export default class WorkoutLabel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
        }
    }

    render() {
        // return(
        //     <Pressable style={{borderColor: '#000000', width: '100%', marginBottom: 7}} onPress={() => this.props.edit()}>
        //         <View style={{width: '100%', height: 30, borderColor: '#000000', borderWidth: 3}}>
        //             <Text>{this.props.name}</Text>
        //         </View>
        //     </Pressable>
        // );
        return (
            <Button
                buttonText={this.props.name}
                onPress={() => this.props.edit()}
                style={{width: '80%', margin: 10}}
                darkmode={this.props.darkmode}
                purple={true}
            />
        );
    }
}