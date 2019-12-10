import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Rating} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Restaurant extends Component {
  render() {
    const {
      container,
      nameText,
      addressText,
      rating,
      phoneText,
      imageWrapper,
      imageStyle,
      contentWrapper,
    } = styles;
    const {item, navigation} = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('MenuFoodsScreen')}>
        <View style={container}>
          <View style={imageWrapper}>
            <Image
              style={imageStyle}
              source={require('../../../images/LOGO.png')}
            />
          </View>
          <View style={contentWrapper}>
            <Text style={nameText}>{item.name}</Text>
            <Text style={addressText}>{item.address}</Text>
            <View style={rating}>
              <Text style={phoneText}>{item.phone}</Text>
              <Rating startingValue={item.rate} imageSize={18} readonly />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#BBBBBB',
    flex: 10,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  imageWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'center',
  },
  contentWrapper: {
    flex: 7,
    paddingRight: 30,
  },
  nameText: {
    color: '#922213',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  addressText: {
    color: '#001F5F',
    flex: 1,
    flexWrap: 'wrap',
  },
  rating: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneText: {
    color: '#2A5010',
  },
});

export default Restaurant;
