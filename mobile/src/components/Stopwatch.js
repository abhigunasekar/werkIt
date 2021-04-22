import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Button from './Button';
import styles from '../light';

export default class Stopwatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //set state for running value to initially be "true"
            //pass down a function from workoutTracker that changes value to false when finished
            hr: '00',
            min: '00',
            sec: '00',
            runStopwatch: false,
        }

        this.stopwatch = this.stopwatch.bind(this);
        this.cycle = this.cycle.bind(this);
    }

    componentDidMount() {
        this.stopwatch();
    }

    componentWillUnmount() {
        this.setState({ runStopwatch: false, hr: '00', min: '00', sec:'00' });
    }

    stopwatch() {
        if (!this.state.runStopwatch) {
            this.setState({ runStopwatch: true }, () => this.cycle());
        } else {
            this.setState({ runStopwatch: false });
        }
    }

    cycle() {
        let sec = parseInt(this.state.sec);
        let min = parseInt(this.state.min);
        let hr = parseInt(this.state.hr);
    
        sec = sec + 1;
    
        if (sec == 60) {
          min = min + 1;
          sec = 0;
        }
        if (min == 60) {
          hr = hr + 1;
          min = 0;
          sec = 0;
        }
    
        if (sec < 10 || sec == 0) {
          sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
          min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
          hr = '0' + hr;
        }
        
        if (this.state.runStopwatch) {
            this.setState({ hr: hr, min: min, sec: sec }, () => this.props.logTime(this.state.hr, this.state.min, this.state.sec));
            setTimeout(() => this.cycle(), 1000);
        }
    }

    render() {
        return(
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Text style={{borderColor: this.props.darkmode ? '#FFFFFF' : '#000000', borderWidth: 3, padding: '1%', margin: 20, fontSize: 30, color: this.props.darkmode ? '#FFFFFF' : '#000000'}}>{this.state.hr}:{this.state.min}:{this.state.sec}</Text>
                <Button
                    buttonText={this.state.runStopwatch ? 'PAUSE' : 'START'}
                    onPress={() => this.stopwatch()}
                    style={{marginLeft: 70}}
                    darkmode={this.props.darkmode}
                    gray={true}
                />
            </View>
        );
    }
}