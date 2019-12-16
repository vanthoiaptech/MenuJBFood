import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

// const {width} = Dimensions.get('window');

class Food extends Component {
  render() {
    const {container, textIndex, textName, textPrice} = styles;
    const {food, index} = this.props;
    const bgColors = ['#DBF4C9', '#F1F1F1'];
    return (
      <View style={{backgroundColor: bgColors[index % bgColors.length]}}>
        <View style={container}>
          <Text style={textIndex}>{index + 1}</Text>
          <Text style={textName}>{food.name}</Text>
          <Text style={textPrice}>{food.price}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 8,
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIndex: {
    color: '#848484',
    fontSize: 13,
    flex: 2,
    textAlign: 'center',
  },
  textName: {
    color: '#848484',
    fontSize: 13,
    textAlign: 'left',
    flexWrap: 'wrap',
    flex: 6,
  },
  textPrice: {
    color: '#848484',
    fontSize: 13,
    flex: 3,
    textAlign: 'center',
  },
});

export default Food;
