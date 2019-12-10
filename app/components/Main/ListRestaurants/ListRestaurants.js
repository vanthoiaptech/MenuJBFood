import React, {Component} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import listRestaurants from '../../../../api/restaurants';
import Restaurant from './Restaurant';
import LoadMoreButton from '../LoadMoreButton';

class ListRestaurants extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <SafeAreaView>
        <FlatList
          data={listRestaurants}
          renderItem={({item}) => (
            <Restaurant item={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={LoadMoreButton}
        />
      </SafeAreaView>
    );
  }
}

export default ListRestaurants;
