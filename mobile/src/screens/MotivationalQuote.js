import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../light';

export default class MotivationalQuote extends Component {
    render() {
        // add styling so it looks like "cover page" for now
        // add motivational quote generator in Sprint 3
        return (
            <View style={styles.motivationalQuote}>
                <Text style={{color: '#7641BD', fontWeight: 'bold', fontSize: 30}}>WERK IT</Text>
            </View>
        );
    }
}