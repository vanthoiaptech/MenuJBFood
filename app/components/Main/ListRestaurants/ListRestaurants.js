import React, {Component} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import listRestaurants from '../../../../api/restaurants';
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
