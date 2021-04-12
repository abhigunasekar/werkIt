import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Button from './Button';
import styles from '../light';

export default class Stopwatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hr: '00',
            min: '00',
            sec: '00',
            runStopwatch: false,
        }

        this.startStopwatch = this.startStopwatch.bind(this);
        this.stopStopwatch = this.stopStopwatch.bind(this);
        this.cycle = this.cycle.bind(this);
    }

    startStopwatch() {
        if (!this.state.runStopwatch) {
            this.setState({ runStopwatch: true }, () => this.cycle());
        }
    }

    stopStopwatch() {
        if (this.state.runStopwatch) {
            this.setState({ runStopwatch: false });
        }
    }

    cycle() {
        if (this.state.runStopwatch) {
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

            this.setState({ hr: hr, min: min, sec: sec });
        
            setTimeout(() => this.cycle(), 1000);
        }
    }

    render() {
        return(
            <View style={{alignItems: 'center'}}>
                <Text style={{borderWidth: 3, padding: '1%', margin: 20, fontSize: 30}}>{this.state.hr}:{this.state.min}:{this.state.sec}</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Button
                        buttonText='Start'
                        onPress={() => this.startStopwatch()}
                        style={{marginRight: 50}}
                        darkmode={this.props.darkmode}
                        purple={true}
                    />
                    <Button
                        buttonText='Stop'
                        onPress={() => this.stopStopwatch()}
                        style={{marginRight: 50}}
                        darkmode={this.props.darkmode}
                        purple={true}
                    />
                    <Button
                        buttonText='Finish'
                        onPress={() => {
                            this.props.finish(this.state.hr, this.state.min, this.state.sec);
                            this.setState({ hr: '00', min: '00', sec: '00' });
                        }}
                        darkmode={this.props.darkmode}
                        purple={true}
                    />
                </View>
            </View>
        );
    }
}