import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  Alert,
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import locale from 'react-native-locale-detector';
import foodsVI from '../../../../api/foods/foods_vi';
import foodsEN from '../../../../api/foods/foods_en';
import foodsJA from '../../../../api/foods/foods_ja';
import Food from './Food';
import LoadMoreButton from '../LoadMoreButton';
import i18n from '../../../utils/i18n';
import EmptyData from '../EmptyData';

const {width} = Dimensions.get('window');

class MenuFoods extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('restaurant').name,
    };
  };

  getFoodsByRestaurantId = id => {
    let foods = foodsJA;
    if (locale === 'en-US') {
      foods = foodsEN;
    }
    if (locale === 'vi-VN') {
      foods = foodsVI;
    }
    return foods.filter(item => {
      if (item.restaurant_id === id) {
        return item;
      }
    });
  };

  openGps = (lat, lng) => {
    // const url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${lat}, ${lng}`;
    const url = Platform.select({
      ios: `http://maps.apple.com/maps?daddr=${lat},${lng}`,
      android: `http://maps.google.com/maps?daddr=${lat},${lng}`,
    });
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log("Can't handle url: " + url);
        }
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

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
    const {restaurant} = this.props.navigation.state.params;

    // Foods list
    let foodsFlatList = (
      <SafeAreaView style={listFoods}>
        <FlatList
          data={this.getFoodsByRestaurantId(restaurant.id)}
          renderItem={({item, index}) => <Food food={item} index={index} />}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={
            <LoadMoreButton
              lengthData={this.getFoodsByRestaurantId(restaurant.id).length}
            />
          }
        />
      </SafeAreaView>
    );

    if (this.getFoodsByRestaurantId(restaurant.id).length === 0) {
      foodsFlatList = <EmptyData />;
    }

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
              onPress={() =>
                this.openGps(restaurant.latitude, restaurant.longitude)
              }>
              <View style={contentText}>
                <Text style={addressText}>{restaurant.address}</Text>
                <Text style={openText}>
                  {i18n.t('categories:business hours')}: {restaurant.open} -{' '}
                  {restaurant.close}
                </Text>
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
        {foodsFlatList}
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
    flex: 4,
    width: width,
  },
  contentWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#C00000',
    width: width,
    paddingVertical: 10,
    paddingHorizontal: 20,
    opacity: 0.8,
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
