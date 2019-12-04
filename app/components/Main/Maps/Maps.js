import React, { Component } from 'react';
import { View, Text } from 'react-native'

class Maps extends Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
      <View>
        <Text>Map Component</Text>
      </View>
    );
  }
}

export default Maps;