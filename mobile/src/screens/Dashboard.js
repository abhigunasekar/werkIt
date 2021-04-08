import React, { 
  Component 
} from 'react';

import { 
  ScrollView, 
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
    
export default class Dashboard extends Component{
  constructor(props) {
    super(props);

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
