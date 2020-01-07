import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {foodImageUrl} from '../../../constants/urlDefine';

class Food extends Component {
  showModal = () => {
    return this.props.showModal;
  };

  render() {
    const {
      container,
      textIndex,
      textName,
      textPrice,
      imageWrapper,
      image,
    } = styles;
    const {food, index} = this.props;
    const bgColors = ['#DBF4C9', '#F1F1F1'];
    const imageFood = food.image;
    return (
      <View style={{backgroundColor: bgColors[index % bgColors.length]}}>
        <TouchableOpacity style={container} onPress={this.showModal()}>
          <Text style={textIndex}>{index + 1}</Text>
          <View style={imageWrapper}>
            <Image
              source={{
                uri: foodImageUrl(imageFood),
              }}
              style={image}
            />
          </View>
          <Text style={textName}>{food.name}</Text>
          <Text style={textPrice}>{food.price}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textIndex: {
    color: '#848484',
    fontSize: 13,
    flex: 1,
    textAlign: 'center',
  },
  imageWrapper: {
    flex: 2,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  textName: {
    color: '#848484',
    fontSize: 13,
    textAlign: 'left',
    flexWrap: 'wrap',
    flex: 5,
  },
  textPrice: {
    color: '#848484',
    fontSize: 13,
    flex: 2,
    textAlign: 'center',
  },
});

export default Food;
