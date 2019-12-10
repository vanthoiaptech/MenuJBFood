import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Food extends Component {
  render() {
    const {container, text} = styles;
    const {food, index} = this.props;
    const bgColors = ['#DBF4C9', '#F1F1F1'];
    return (
      <View style={{backgroundColor: bgColors[index % bgColors.length]}}>
        <View style={container}>
          <Text style={text}>{index + 1}</Text>
          <Text style={text}>{food.name}</Text>
          <Text style={text}>{food.price}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
  },
  text: {
    color: '#848484',
    fontSize: 13,
  },
});

export default Food;
