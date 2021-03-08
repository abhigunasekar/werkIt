import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground } from 'react-native'
import Button from '../components/Button';
import ImageUploader from 'react-images-upload';
import mafioso from '../../assets/MV5BOGQ4NTRhNjMtODYyYi00NjJhLThmZTUtNmI4MTdlZWM5MDliXkEyXkFqcGdeQXVyMzMzMTExNzI@._V1_UY1200_CR109,0,630,1200_AL_.jpg';
import defaultPic from '../../assets/icon.jpg';

export default class Dashboard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            pictures: [],
            profile: defaultPic
        };

        this.onImageChange = this.onImageChange.bind(this);
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                profile: URL.createObjectURL(img)
            });
        }
    };

    render() {
        return(
            <ScrollView>
                <ImageBackground source={this.state.profile} imageStyle={{width: 200, height: 200, borderRadius: 200/ 2}}>
                    <label title="Click to give ya self a new look!" for="updateProfile" style={{width: 200, height: 200, borderRadius: 200/ 2}}></label>
                </ImageBackground>

                <input type="file" id="updateProfile" name="myImage" onChange={this.onImageChange} hidden/>

                <Text>
                    Dashboard
                </Text>

                <Button buttonText="Create New Workout" onPress={() => this.props.navigation.navigate('WorkoutEditor')}/>

            </ScrollView>
        );
    }
}