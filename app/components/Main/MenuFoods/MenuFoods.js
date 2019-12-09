import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

class MenuFoods extends Component {
  render() {
    const {
      container,
      banner,
      bannerImg,
      listFoods,
      contentWrapper,
      contentText,
      contentLogo,
      logoImg,
      addressText,
      openText,
    } = styles;
    return (
      <View style={container}>
        <View style={banner}>
          <Image
            style={bannerImg}
            source={require('../../../images/restaurants.jpg')}
          />
          <View style={contentWrapper}>
            <View style={contentText}>
              <Text style={addressText}>
                46 Phan Thanh, Quận Thanh Khê, Đà Nẵng
              </Text>
              <Text style={openText}>Giờ mở cửa: 10:00 - 22:00</Text>
            </View>
            <View style={contentLogo}>
              <Image
                style={logoImg}
                source={require('../../../images/logo_trang.png')}
              />
            </View>
          </View>
        </View>
        <SafeAreaView style={listFoods}>
          <Text>Test</Text>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  banner: {
    flex: 4,
    position: 'relative',
  },
  bannerImg: {
    width: width,
    height: width / 1.5,
  },
  contentWrapper: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#C00000',
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contentText: {
    flex: 9,
  },
  contentLogo: {
    flex: 1,
  },
  logoImg: {
    height: 30,
    width: 30,
    resizeMode: 'center',
  },
  addressText: {
    color: '#FFF',
    flexWrap: 'wrap',
  },
  openText: {
    color: '#E8B465',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  listFoods: {
    flex: 6,
    backgroundColor: 'blue',
  },
});

export default MenuFoods;
