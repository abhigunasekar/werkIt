import React, { Component } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import * as serverMethods from '../ServerMethods';
import TextBox from '../components/TextBox';

export default class DayPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            savedWorkouts: this.props.savedWorkouts,
        }
    }

    render() {
        return (
            <View style={{flexDirection: 'row', zIndex: this.props.zIndex, marginBottom: 20}}>
                <Text style={{marginTop: 10, marginRight: this.props.margin}}>{this.props.day}:</Text>
                <DropDownPicker
                    items={this.state.savedWorkouts}
                    defaultValue={''}
                    placeholder='Select a workout'
                    containerStyle={{height: 40, width: '50%'}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={(item) => {
                        this.props.select(item.value)
                    }}
                />
            </View>
        );
    }
}