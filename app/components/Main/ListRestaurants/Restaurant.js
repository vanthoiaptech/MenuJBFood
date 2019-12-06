import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

class Restaurant extends Component {
  render() {
    const {
      container,
      nameText,
      addressText,
      phoneText,
      imageWrapper,
      imageStyle,
      contentWrapper,
    } = styles;
    const {item} = this.props;
    return (
      <View style={container}>
        <View style={imageWrapper}>
          <Image
            style={imageStyle}
            source={{
              uri:
                'https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/103924047/original/ca15308a37c9af2c269da0e1bd86daec5d290f6d/design-a-food-restaurant-logo-with-a-unique-style.png',
            }}
          />
        </View>
        <View style={contentWrapper}>
          <Text style={nameText}>{item.name}</Text>
          <Text style={addressText}>{item.address}</Text>
          <View>
            <Text style={phoneText}>{item.phone}</Text>
            <Text>{item.rate}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    flex: 10,
    flexDirection: 'row',
  },
  imageWrapper: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 100,
    height: 100,
  },
  contentWrapper: {
    flex: 7,
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
  phoneText: {
    color: '#2A5010',
  },
});

export default Restaurant;
