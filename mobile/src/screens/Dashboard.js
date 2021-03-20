import React, { Component } from 'react'
import { ScrollView, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import Button from '../components/Button';
// import ImageUploader from 'react-images-upload';
import mafioso from '../../assets/MV5BOGQ4NTRhNjMtODYyYi00NjJhLThmZTUtNmI4MTdlZWM5MDliXkEyXkFqcGdeQXVyMzMzMTExNzI@._V1_UY1200_CR109,0,630,1200_AL_.jpg';
import defaultPic from '../../assets/icon.jpg';

import ReactFileUploadMobile from 'react-file-upload-mobile';

const [image, setImage] = useState();
const [imageName, setImageName] = useState();
const clearAttachment = () => {
    setImage('');
    setImageName('');
}
const onUpload = (file) => {
    // upload api
    setImage(URL.createObjectURL(file));
}
const preview = () => {
    // preview picture
}
    

export default class Dashboard extends Component{
    constructor(props) {
        super(props);

        //console.log(this.props.route.params);
        /* this.state = {
            pictures: [],
            profile: defaultPic
        }; */

        // this.onImageChange = this.onImageChange.bind(this);
    }

    /* onImageChange = event => {
        console.log('Clicked!');
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                profile: URL.createObjectURL(img)
            });
        }
    }; */

    render() {
        /* let workoutList = [];
        for (let i = 0; i < this.state.workouts.length; i++) {
            let workout = this.state.workouts[i];
            workoutList.push(
                <WorkoutLabel
                    key={i}
                    name={workout.name}
                    exercises={workout.exercies}
                    edit={() => this.props.navigation.navigate('WorkoutEditor', { workout: workout })}
                />
            );
        } */
        return(
            <ScrollView>
                {/* <TouchableOpacity onPress={this.onImageChange}>
                    <Image 
                        source={this.state.profile} 
                        style={{width: 200, height: 200, borderRadius: 200/ 2}}>
                    </Image>
                </TouchableOpacity> */}
                <ReactFileUploadMobile
        fileUrl={image}
        fileName={imageName}
        displayOnly={false}
        preview={preview}
        compressImg={0.8}
        onFileDelete={clearAttachment}
        onFileUpload={onUpload}
        showNote={true}
        uploadSuffix={['docx', 'doc', 'jpg', 'png', 'jpeg', 'zip']}
        uploadImgSuffix={['jpg', 'png', 'jpeg']}
    />
                

                {/* <input type="file" id="updateProfile" name="myImage" onChange={this.onImageChange} hidden/> */}

                <Text>
                    Dashboard
                </Text>

                <Button buttonText="Create New Workout" onPress={() => this.props.navigation.navigate('WorkoutEditor')}/>

            </ScrollView>
        );
    }
}