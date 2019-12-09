import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import categories from '../../../../api/categories';
import Category from './Category';
import LoadMoreButton from '../LoadMoreButton';

class Categories extends Component {
  render() {
    const {container, listCategories} = styles;
    const {navigation} = this.props;
    return (
      <SafeAreaView style={container}>
        <FlatList
          contentContainerStyle={listCategories}
          data={categories}
          numColumns={3}
          renderItem={({item}) => (
            <Category navigation={navigation} category={item} />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={<LoadMoreButton />}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
  },
  listCategories: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default Categories;
