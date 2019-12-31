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
  TouchableOpacity,
} from 'react-native';
// import locale from 'react-native-locale-detector';
import {getLanguageCode} from '../../../helpers';
import foodsVI from '../../../../api/foods/foods_vi';
import foodsEN from '../../../../api/foods/foods_en';
import foodsJA from '../../../../api/foods/foods_ja';
import Food from './Food';
import i18n from '../../../utils/i18n';
import EmptyData from '../EmptyData';
import FoodModal from './FoodModal';

const {width} = Dimensions.get('window');

class MenuFoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      imageName: '',
      foods: [],
      languageCode: '',
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('restaurant').name,
    };
  };

  getFoodsByRestaurantId = id => {
    let foods = foodsJA;
    let {languageCode} = this.state;
    // if (languageCode === '') {
    //   languageCode = locale.substr(0, 2);
    // }
    if (languageCode === 'vi') {
      foods = foodsVI;
    }
    if (languageCode === 'en') {
      foods = foodsEN;
    }
    let tmp = [];
    return foods.filter(item => {
      if (item.restaurant_id === id) {
        tmp.push(item);
        this.setState({
          foods: tmp,
        });
      }
    });
  };

  async componentDidMount() {
    const {restaurant} = this.props.navigation.state.params;
    await getLanguageCode()
      .then(res =>
        this.setState({
          languageCode: res,
        }),
      )
      .catch(err => console.log(err));
    this.getFoodsByRestaurantId(restaurant.id);
  }

  // open maps app redirect
  openGps = (lat, lng) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/maps?daddr=${lat},${lng}`,
      android: `http://maps.google.com/maps?daddr=${lat},${lng}`,
    });
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log('Can not handle url: ' + url);
        }
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  // set show and hide food modal
  setModalVisible = (imageName = null) => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      imageName: imageName,
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
    const {foods} = this.state;
    const {restaurant} = this.props.navigation.state.params;

    // Foods list
    let foodsFlatList = (
      <SafeAreaView style={listFoods}>
        <FlatList
          data={foods}
          renderItem={({item, index}) => (
            <Food
              food={item}
              index={index}
              showModal={() => this.setModalVisible(item.image)}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    );

    if (foods.length === 0) {
      foodsFlatList = <EmptyData />;
    }

    const {imageName, isModalVisible} = this.state;

    return (
      <View style={container}>
        <FoodModal
          isModalVisible={isModalVisible}
          imageName={imageName}
          closeModal={() => this.setModalVisible()}
        />
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
    justifyContent: 'center',
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
    opacity: 0.7,
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
