import React, {Component} from 'react';
import {FlatList, SafeAreaView, RefreshControl} from 'react-native';
// import locale from 'react-native-locale-detector';
import {getLanguageCode} from '../../../helpers';
import listRestaurantsVI from '../../../../api/restaurants/restaurants_vi';
import listRestaurantsEN from '../../../../api/restaurants/restaurants_en';
import listRestaurantsJA from '../../../../api/restaurants/restaurants_ja';
import Restaurant from './Restaurant';
import EmptyData from '../EmptyData';

class ListRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: '',
      listRestaurants: [],
      refreshing: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoryName'),
    };
  };

  getListRestaurantsByCategoryId = id => {
    let listRestaurants = listRestaurantsJA;
    let {languageCode} = this.state;
    // if (languageCode === '') {
    //   languageCode = locale.substr(0, 2);
    // }
    if (languageCode === 'vi') {
      listRestaurants = listRestaurantsVI;
    }
    if (languageCode === 'en') {
      listRestaurants = listRestaurantsEN;
    }
    let tmp = [];
    return listRestaurants.filter(item => {
      if (item.category_id === id) {
        tmp.push(item);
        this.setState({
          listRestaurants: tmp,
        });
      }
    });
  };

  async componentDidMount() {
    const {categoryId} = this.props.navigation.state.params;
    await getLanguageCode()
      .then(res =>
        this.setState({
          languageCode: res,
        }),
      )
      .catch(err => console.log(err));
    this.getListRestaurantsByCategoryId(categoryId);
  }

  onRefresh = () => {
    this.getListRestaurantsByCategoryId();
  };

  render() {
    const {navigation} = this.props;
    const {listRestaurants, refreshing} = this.state;

    if (listRestaurants.length <= 0) {
      return <EmptyData />;
    }
    return (
      <SafeAreaView>
        <FlatList
          data={listRestaurants}
          renderItem={({item}) => (
            <Restaurant restaurant={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

export default ListRestaurants;
