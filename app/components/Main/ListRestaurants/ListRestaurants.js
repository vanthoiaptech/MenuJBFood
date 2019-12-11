import React, {Component} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import listRestaurants from '../../../../api/restaurants';
import Restaurant from './Restaurant';
import LoadMoreButton from '../LoadMoreButton';

class ListRestaurants extends Component {
  getListRestaurantsByCategoryId = id => {
    return listRestaurants.filter(item => {
      if (item.category_id === id) {
        return item;
      }
    });
  };

  render() {
    const {navigation} = this.props;
    const {categoryId} = this.props.navigation.state.params;
    return (
      <SafeAreaView>
        <FlatList
          data={this.getListRestaurantsByCategoryId(categoryId)}
          renderItem={({item}) => (
            <Restaurant item={item} navigation={navigation} />
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
