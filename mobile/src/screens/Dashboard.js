import React, { Component } from 'react'
import { ScrollView, Text, Image } from 'react-native'
import Button from '../components/Button';
import mafioso from '../../assets/MV5BOGQ4NTRhNjMtODYyYi00NjJhLThmZTUtNmI4MTdlZWM5MDliXkEyXkFqcGdeQXVyMzMzMTExNzI@._V1_UY1200_CR109,0,630,1200_AL_.jpg';

export default class Dashboard extends Component{
    constructor() {
        super();

        this.state = {

        };
    }

    render() {
        return(
            <ScrollView>
                <Image
                    source={mafioso}
                    style={{width: 200, height: 200, borderRadius: 200/ 2}}
                    />
                {/* <img src={mafioso} alt="Slow but sure" /> */}
                <Text>Dashboard</Text>
                <Button
                    buttonText="Create New Workout"
                    onPress={() => this.props.navigation.navigate('WorkoutEditor')}
                />
            </ScrollView>
        );
    }
}