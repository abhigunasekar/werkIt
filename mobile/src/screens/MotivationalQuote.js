import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../light';

export default class MotivationalQuote extends Component {
    constructor(props) {
        super(props);
        /* this.state = {
            quote: '',
        }
        this.setState({ quote: this.props.getQuote}) */
    }

    render() {
        // add styling so it looks like "cover page" for now
        // add motivational quote generator in Sprint 3
        return (
            <View style={styles.motivationalQuote}>
                <Text style={{color: '#7641BD', fontWeight: 'bold', fontSize: 30}}>Just wanted to let you know...</Text>

                <Text style={{color: '#7641BD', fontWeight: 'bold', fontSize: 30}}>{this.props.quote}</Text>
            </View>
        );
    }
}