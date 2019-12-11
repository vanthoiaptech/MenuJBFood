import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class EmptyData extends Component {
  render() {
    const {container, text} = styles;
    return (
      <View style={container}>
        <Text style={text}>No data available...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default EmptyData;
