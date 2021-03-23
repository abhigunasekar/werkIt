import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Button from '../components/Button';

export default class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View style={{alignItems: 'center', paddingTop: 300}}>
                <Text>NOT YET IMPLEMENTED</Text>
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