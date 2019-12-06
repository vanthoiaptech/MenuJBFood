import React, {Component} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import listRestaurants from '../../../../api/data';
import Restaurant from './Restaurant';

class ListRestaurants extends Component {
  render() {
    return (
      <SafeAreaView>
        <FlatList
          data={listRestaurants}
          renderItem={({item}) => <Restaurant item={item} />}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}

export default ListRestaurants;
