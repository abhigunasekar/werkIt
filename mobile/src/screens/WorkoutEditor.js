import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';

import Button from '../components/Button';

export default class WorkoutEditor extends Component {
    constructor() {
        super();

        this.state = {
            exercises: [],
        };
    }

    render() {
        return(
            <View>
                <Text>WorkoutEditor</Text>
                <ScrollView>
                    <Button
                        buttonText='Submit'
                        onPress={() => this.props.navigation.navigate('Dashboard')}
                        orange={true}
                    />
                </ScrollView>
            </View>
        );
    }
}