import React, { Component } from 'react'
import { ScrollView, Text, Image } from 'react-native'
import Button from '../components/Button';
import ImageUploader from 'react-images-upload';
import mafioso from '../../assets/MV5BOGQ4NTRhNjMtODYyYi00NjJhLThmZTUtNmI4MTdlZWM5MDliXkEyXkFqcGdeQXVyMzMzMTExNzI@._V1_UY1200_CR109,0,630,1200_AL_.jpg';

export default class Dashboard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            pictures: [],
            profile: null
        };
        this.onDrop = this.onDrop.bind(this);
    
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            profile: URL.createObjectURL(picture)
        });
    }

    render() {
        return(
            <ScrollView>
                <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={524288000000000}
                />
                <Image
                    source={this.state.profile}
                    style={{width: 200, height: 200, borderRadius: 200/ 2}}
                    />
                <h1> Select Image </h1>
                <input type="file" name="myImage" onChange={}
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