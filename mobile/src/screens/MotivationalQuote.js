import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../light';

export default class MotivationalQuote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quote: '',
        }

        this.getQuote = this.getQuote.bind(this);
        this.getQuote();
    }

    async getQuote() {
        const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            this.setState({ quote: "\"" + data['quoteText'] + "\"" });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <View style={styles.motivationalQuote}>
                <Text style={{color: '#7641BD', fontWeight: 'bold', fontSize: 30}}>{this.state.quote}</Text>
            </View>
        );
    }
}