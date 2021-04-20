import React, { Component } from 'react';
import { Pressable, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


import light from '../light';
import dark from '../dark';

export default class Button extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.purple) {
            return (
                <Pressable
                    onPress={() => this.props.onPress()}
                    style={({ pressed }) => [ this.props.darkmode ? { backgroundColor: pressed ? '#3E3E3E' : '#7641BD' , borderColor: '#7641BD' } : { backgroundColor: pressed ? '#7641BD' : '#FFFFFF' , borderColor: '#7641BD' }, this.props.darkmode ? dark.button : light.button, this.props.style ]}
                >
                    {({ pressed }) => <Text style={this.props.darkmode ? { color: pressed ? '#7641BD' : '#FFFFFF'} : { color: pressed ? '#FFFFFF' : '#7641BD' }}>{this.props.buttonText}</Text> }
                </Pressable>
            );
        } else if (this.props.orange) {
            return (
                <Pressable
                    onPress={() => this.props.onPress()}
                    style={({ pressed }) => [ this.props.darkmode ? { backgroundColor: pressed ? '#3E3E3E' : '#FB963C' , borderColor: '#FB963C' } : { backgroundColor: pressed ? '#FB963C' : '#FFFFFF' , borderColor: '#FB963C' }, this.props.darkmode ? dark.button : light.button, this.props.style ]}
                >
                    {({ pressed }) => <Text style={this.props.darkmode ? { color: pressed ? '#FB963C' : '#FFFFFF' } : { color: pressed ? '#FFFFFF' : '#FB963C' }}>{this.props.buttonText}</Text> }
                </Pressable>
            );
        }   else if (this.props.gray) {
            return (
                <Pressable
                    onPress={() => this.props.onPress()}
                    style={({ pressed }) => [ this.props.darkmode ? { backgroundColor: pressed ? '#7E7E7E' : '#535C68' , borderColor: '#535C68' } : { backgroundColor: pressed ? '#535C68' : '#FFFFFF' , borderColor: '#535C68' }, this.props.darkmode ? dark.button : light.button, this.props.style ]}
                >
                    {({ pressed }) => <Text style={this.props.darkmode ? { color: pressed ? '#535C68' : '#FFFFFF' } : { color: pressed ? '#FFFFFF' : '#535C68' }}>{this.props.buttonText}</Text> }
                </Pressable>
            );
        } else if (this.props.fingerPrint) {
            return (
                <Pressable
                    onPress={() => this.props.onPress()}
                    style={this.props.style}
                >
                    <MaterialCommunityIcons name="fingerprint" size={24} color="black" />
                </Pressable>
                );
        } else if (this.props.send) {
            return (
                <Pressable
                    onPress={() => this.props.onPress()}
                    style={this.props.style}
                >
                    <MaterialCommunityIcons name="send" size={24} color="black" />
                </Pressable>
            );
        } else {
            return null;
        }
    }
}