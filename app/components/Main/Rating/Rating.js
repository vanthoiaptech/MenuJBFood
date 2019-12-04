import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Rating extends Component {
  static navigationOptions = {
    header: null,
  };
  
  render() {
    return (
      <View>
        <Text>Rating Component</Text>
      </View>
    );
  }
}

export default Rating;