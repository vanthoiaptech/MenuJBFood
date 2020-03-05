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
  RefreshControl,
} from 'react-native';
import {getLanguageCode} from '../../../helpers';
import Food from './Food';
import i18n from '../../../utils/i18n';
import EmptyData from '../EmptyData';
import FoodModal from './FoodModal';
import {restaurantImageUrl} from '../../../constants/urlDefine';
import {domain} from '../../../constants/urlDefine';
import Spinner from '../Spinner';
import Error from '../Error';

const {width} = Dimensions.get('window');

class MenuFoods extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      imageName: '',
      foods: [],
      foodsNextPage: [],
      languageCode: 'ja',
      isLoading: false,
      page: 1,
      hasScrolled: false,
      isRefreshing: false,
      error: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('restaurant').name,
    };
  };

  // get foods data from backend
  getFoodsByRestaurantId = async id => {
    this.setState({isLoading: true});
    let {languageCode, page, foods} = this.state;
    try {
      let response = await fetch(
        `${domain}/api/foods/${id}/${languageCode}?page=${page}`,
      );
      let responseJson = await response.json();
      this.setState({
        foods: [...foods, ...responseJson.data],
        foodsNextPage: responseJson.data,
        isLoading: false,
        error: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true,
      });
    }
  };

  async componentDidMount() {
    const {restaurant} = this.props.navigation.state.params;
    await getLanguageCode()
      .then(res => {
        const languageCode = res ? res : 'ja';
        this.setState({
          languageCode,
        });
      })
      .catch(() =>
        this.setState({
          languageCode: 'ja',
        }),
      );
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

  // handle load more Foods data from backend when scroll to the bottom
  handleLoadMore = () => {
    if (!this.state.hasScrolled) {
      return;
    }
    const {restaurant} = this.props.navigation.state.params;
    const {isLoading, foodsNextPage} = this.state;
    if (!isLoading && foodsNextPage.length > 0) {
      this.setState(
        {
          isLoading: true,
          page: this.state.page + 1,
        },
        () => this.getFoodsByRestaurantId(restaurant.id),
      );
    }
  };

  // spinner load more data
  renderFooter = () => {
    if (!this.state.isLoading) {
      return null;
    }
    return <Spinner size="small" />;
  };

  onScroll = () => {
    this.setState({
      hasScrolled: true,
    });
  };

  onRefresh = async () => {
    this.setState({
      isRefreshing: true,
      page: 1,
    });

    const {restaurant} = this.props.navigation.state.params;
    const {languageCode} = this.state;
    try {
      let response = await fetch(
        `${domain}/api/foods/${restaurant.id}/${languageCode}?page=1`,
      );
      let responseJson = await response.json();
      this.setState({
        foods: responseJson.data,
        foodsNextPage: responseJson.data,
        isRefreshing: false,
        error: false,
      });
    } catch (error) {
      this.setState({
        foods: [],
        foodsNextPage: [],
        isRefreshing: false,
        error: true,
      });
    }
  };

  renderFoodsFlatList = () => {
    const {foods, isLoading, page, error} = this.state;
    const {restaurant} = this.props.navigation.state.params;
    if (isLoading && page === 1) {
      return <Spinner size="large" style="loading" />;
    }

    if (error) {
      return <Error retry={() => this.getFoodsByRestaurantId(restaurant.id)} />;
    }

    if (foods.length <= 0) {
      return <EmptyData />;
    }

    return (
      <SafeAreaView style={styles.listFoods}>
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
          onEndReachedThreshold={0.01}
          onEndReached={() => this.handleLoadMore()}
          ListFooterComponent={() => this.renderFooter()}
          onScroll={() => this.onScroll()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onRefresh()}
              colors={['#0000FF']}
            />
          }
        />
      </SafeAreaView>
    );
  };

  styleCoverImage = imageName => {
    let styleImg = {
      width: width,
      flex: 4,
    };
    if (imageName === 'default-restaurant.png') {
      styleImg = {
        flex: 4,
        width: width,
        resizeMode: 'contain',
        margin: 20,
      };
    }
    return styleImg;
  };

  render() {
    const {
      container,
      banner,
      contentWrapper,
      contentButton,
      contentText,
      contentLogo,
      logoImg,
      addressText,
      openText,
    } = styles;
    const {restaurant} = this.props.navigation.state.params;
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
            style={this.styleCoverImage(restaurant.image)}
            source={{uri: restaurantImageUrl(restaurant.image)}}
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
        {this.renderFoodsFlatList()}
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
    justifyContent: 'center',
    alignItems: 'center',
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
  spinner: {
    flex: 6,
    justifyContent: 'center',
  },
});

export default MenuFoods;
