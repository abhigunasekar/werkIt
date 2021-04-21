import React, { Component } from 'react';
import { View, Text } from 'react-native';

import * as serverMethods from '../ServerMethods';
import styles from '../light';

export default class MotivationalQuote extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            quoteText: '',
            quoteAuthor: '',
        }
    }

    componentDidMount() {
        serverMethods.getQuote()
            .then(response => response.json())
            .then(response => this.setState({ quoteText: response.quoteText, quoteAuthor: response.quoteAuthor }));
    }

    render() {
        // add styling so it looks like "cover page" for now
        // add motivational quote generator in Sprint 3
        console.log(this.state.quote)
        return (
            <View style={styles.motivationalQuote}>
                <Text style={{color: '#7641BD', fontWeight: 'bold', fontSize: 50, marginTop: 250}}>WERK IT</Text>
                <View style={{width: '80%', borderWidth: 1}}>
                    <Text style={{color: '#7641BD', fontStyle: 'italic', fontSize: 15, marginTop: 30}}>{this.state.quoteText}</Text>
                </View>
                <Text style={{color: '#7641BD', fontSize: 10, marginTop: 20, marginLeft: 70}}>- {this.state.quoteAuthor}</Text>
            </View>
        );
    }
}