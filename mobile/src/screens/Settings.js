import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';

import Button from '../components/Button';

import * as serverMethods from '../ServerMethods';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            darkMode: this.props.darkmode,
        }
    }

    render() {
        return(
            <View style={{alignItems: 'center', paddingTop: 300}}>
                <Text>NOT YET IMPLEMENTED</Text>
                <Switch
                    trackColor={{ true: "#3E3E3E" }}
                    thumbColor={this.state.darkMode ? "#7641BD" : "#3E3E3E"}
                    ios_backgroundColor="#7641BD"
                    onValueChange={() => {
                        serverMethods.updateDarkmode(this.props.username);
                        this.props.updateDarkmode();
                        this.setState({ darkMode: !this.state.darkMode })
                    }}
                    //add server call to update status of darkmode
                    //potentially need to pass down a function to update darkmode in App.js
                    value={this.state.darkMode}
                />
                <Button
                    buttonText='Log out'
                    onPress={() => this.props.logout()}
                    style={{marginLeft: 20}}
                    orange={true}
                />
            </View>
        );
    }
}