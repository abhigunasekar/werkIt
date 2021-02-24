import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import TextBox from '../components/TextBox';
import Button from '../components/Button';

export default class WorkoutEditor extends Component {
    constructor() {
        super();

        this.state = {

        };
    }

    render() {
        return(
            <ScrollView>
                <Text>WorkoutEditor</Text>
                <Button
                    buttonText='Submit'
                    onPress={() => this.props.navigation.navigate('Dashboard')}
                />
            </ScrollView>
        );
    }
}