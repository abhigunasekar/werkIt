import React, { Component } from 'react';
import { View, Text, Switch } from 'react-native';

import Button from '../components/Button';

export default class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            darkMode = false,
        }
    }

    render() {
        return(
            <View style={{alignItems: 'center', paddingTop: 300}}>
                <Text>NOT YET IMPLEMENTED</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={this.state.darkMode ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() => this.setState({ darkMode: !this.state.darkMode })}
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