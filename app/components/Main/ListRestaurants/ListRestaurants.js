import React, {Component} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import locale from 'react-native-locale-detector';
import listRestaurantsVI from '../../../../api/restaurants/restaurants_vi';
import listRestaurantsEN from '../../../../api/restaurants/restaurants_en';
import listRestaurantsJA from '../../../../api/restaurants/restaurants_ja';
import Restaurant from './Restaurant';
import LoadMoreButton from '../LoadMoreButton';
import EmptyData from '../EmptyData';

class ListRestaurants extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoryName'),
    };
  };

  getListRestaurantsByCategoryId = id => {
    let listRestaurants = listRestaurantsJA;
    if (locale === 'en-US') {
      listRestaurants = listRestaurantsEN;
    }
    if (locale === 'vi-VN') {
      listRestaurants = listRestaurantsVI;
    }
    return listRestaurants.filter(item => {
      if (item.category_id === id) {
        return item;
      }
    });
  };

  render() {
    const {navigation} = this.props;
    const {categoryId} = this.props.navigation.state.params;
    if (this.getListRestaurantsByCategoryId(categoryId).length <= 0) {
      return <EmptyData />;
    }
    return (
      <SafeAreaView>
        <FlatList
          data={this.getListRestaurantsByCategoryId(categoryId)}
          renderItem={({item}) => (
            <Restaurant restaurant={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={
            <LoadMoreButton
              lengthData={
                this.getListRestaurantsByCategoryId(categoryId).length
              }
            />
          }
        />
      </SafeAreaView>
    );
  }
}

export default ListRestaurants;
