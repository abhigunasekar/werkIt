import React, { 
  Component 
} from 'react';

import { 
  ScrollView, 
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Image
} from 'react-native';
    
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

    this.requestStoragePermission = this.requestStoragePermission.bind(this);
    this.pickPic = this.pickPic.bind(this);
  }

  requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: "Permission title",
          message:
            "Permission message",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Can use EXTERNAL_STORAGE");
      } else {
        console.log("Cannot use EXTERNAL_STORAGE");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  pickPic = async() => {
    
  }

  render() {
    return(
      <ScrollView>
        <TouchableOpacity onPress={this.pickPic}>
            <Image 
                source={this.state.profile} 
                style={{width: 200, height: 200, borderRadius: 200/ 2}}>
            </Image>
        </TouchableOpacity>

        <Text>
          Dashboard
        </Text>
      </ScrollView>
    );
  }
};