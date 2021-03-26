import React, { useState, useCallback, useContext, Fragment, Component } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { 
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View, 
    Text,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    Button,
    PermissionsAndroid
} from 'react-native';

import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

// import Uploady from "@rpldy/uploady";
// import UploadButton from "@rpldy/upload-butt"
// import Button from '../components/Button';
// import DocumentPicker from "react-native-document-picker/index";
// import ImageUploader from 'react-images-upload';
// import mafioso from '../../assets/MV5BOGQ4NTRhNjMtODYyYi00NjJhLThmZTUtNmI4MTdlZWM5MDliXkEyXkFqcGdeQXVyMzMzMTExNzI@._V1_UY1200_CR109,0,630,1200_AL_.jpg';
// import defaultPic from '../../assets/icon.jpg';

/* import NativeUploady, {
    UploadyContext,
    useItemFinishListener,
    useItemStartListener,
    useItemErrorListener,
} from "@rpldy/native-uploady"; */

// import ReactFileUploadMobile from 'react-file-upload-mobile';

/* const [image, setImage] = useState();
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
} */
    
const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

export default class Dashboard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            filepath: {
                data: '',
                uri: ''
              },
              fileData: '',
              fileUri: ''
        };
        //console.log(this.props.route.params);
        /* this.state = {
            pictures: [],
            profile: defaultPic
        }; */

        // this.onImageChange = this.onImageChange.bind(this);
    }

    

    chooseImage = (event) => {
        let options = {
          title: 'Select Image',
          customButtons: [
            { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
    
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            // alert(JSON.stringify(response));s
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
    }

    launchCamera = () => {
        if (requestCameraPermission()) {
            let options = {
                storageOptions: {
                  skipBackup: true,
                  path: 'images',
                },
              };
              ImagePicker.launchCamera(options, (response) => {
                console.log('Response = ', response);
          
                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                  alert(response.customButton);
                } else {
                  const source = { uri: response.uri };
                  console.log('response', JSON.stringify(response));
                  this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                  });
                }
              });
        }
        
    
    }

    launchImageLibrary = () => {
        let options = {
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            const source = { uri: response.uri };
            console.log('response', JSON.stringify(response));
            this.setState({
              filePath: response,
              fileData: response.data,
              fileUri: response.uri
            });
          }
        });
    
    }

    renderFileData() {
        if (this.state.fileData) {
          return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileData }}
            style={styles.images}
          />
        } else {
          /* return <Image source={require('../assets/dummy.png')}
            style={styles.images}
          /> */
        }
    }
    
    renderFileUri() {
        if (this.state.fileUri) {
            return <Image
            source={{ uri: this.state.fileUri }}
            style={styles.images}
            />
        } else {
            /* return <Image
            source={require('./assets/galeryImages.jpg')}
            style={styles.images}
            /> */
        }
    }

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
                

                {/* <input type="file" id="updateProfile" name="myImage" onChange={this.onImageChange} hidden/> */}

                <Text>
                    Dashboard
                </Text>

                {/* <Button buttonText="Create New Workout" onPress={() => this.props.navigation.navigate('WorkoutEditor')}/> */}

                <Fragment>
                    <StatusBar barStyle="dark-content" />
                    <SafeAreaView>
                    <View style={styles.body}>
            <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera and Gallery</Text>
            <View style={styles.ImageSections}>
              <View>
                {this.renderFileData()}
                <Text  style={{textAlign:'center'}}>Base 64 String</Text>
              </View>
              <View>
                {this.renderFileUri()}
                <Text style={{textAlign:'center'}}>File Uri</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>
              <TouchableOpacity onPress={this.chooseImage} style={styles.btnSection}  >
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchCamera} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.launchImageLibrary} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Image Library</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </Fragment>

            </ScrollView>

            
            
        );
    }
};

const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
  
    body: {
      backgroundColor: Colors.white,
      justifyContent: 'center',
      borderColor: 'black',
      borderWidth: 1,
      height: Dimensions.get('screen').height - 20,
      width: Dimensions.get('screen').width
    },
    ImageSections: {
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 8,
      paddingVertical: 8,
      justifyContent: 'center'
    },
    images: {
      width: 150,
      height: 150,
      borderColor: 'black',
      borderWidth: 1,
      marginHorizontal: 3
    },
    btnParentSection: {
      alignItems: 'center',
      marginTop:10
    },
    btnSection: {
      width: 225,
      height: 50,
      backgroundColor: '#DCDCDC',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 3,
      marginBottom:10
    },
    btnText: {
      textAlign: 'center',
      color: 'gray',
      fontSize: 14,
      fontWeight:'bold'
    }
  });