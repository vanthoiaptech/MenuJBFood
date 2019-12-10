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
import {TouchableOpacity} from 'react-native-gesture-handler';
import foods from '../../../../api/foods';
import Food from './Food';
import LoadMoreButton from '../LoadMoreButton';

const {width} = Dimensions.get('window');

class MenuFoods extends Component {
  render() {
    const {
      container,
      banner,
      bannerImg,
      listFoods,
      contentWrapper,
      contentButton,
      contentText,
      contentLogo,
      logoImg,
      addressText,
      openText,
    } = styles;
    const {navigation} = this.props;

    return (
      <View style={container}>
        <View style={banner}>
          <Image
            style={bannerImg}
            source={require('../../../images/restaurants.jpg')}
          />
          <View style={contentWrapper}>
            <TouchableOpacity
              style={contentButton}
              onPress={() => navigation.navigate('MapDirectionsScreen')}>
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
            </TouchableOpacity>
          </View>
        </View>
        {/* Foods list */}
        <SafeAreaView style={listFoods}>
          <FlatList
            data={foods}
            renderItem={({item, index}) => <Food food={item} index={index} />}
            keyExtractor={item => item.id.toString()}
            ListFooterComponent={LoadMoreButton}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    width: width,
  },
  banner: {
    flex: 4,
    position: 'relative',
  },
  bannerImg: {
    width: width,
    height: width / 2,
  },
  contentWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#C00000',
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  contentButton: {
    flex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});

export default MenuFoods;
