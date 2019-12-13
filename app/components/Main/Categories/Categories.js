import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import Category from './Category';
import LoadMoreButton from '../LoadMoreButton';
import EmptyData from '../EmptyData';
import locale from 'react-native-locale-detector';
import categoriesVI from '../../../../api/categories/categories_vi';
import categoriesEN from '../../../../api/categories/categories_en';
import categoriesJA from '../../../../api/categories/categories_ja';

class Categories extends Component {
  render() {
    const {container, listCategories} = styles;
    const {navigation} = this.props;
    let categories = categoriesJA;
    if (locale === 'en-US') {
      categories = categoriesEN;
    }
    if (locale === 'vi-VN') {
      categories = categoriesVI;
    }

    if (categories.length <= 0) {
      return <EmptyData />;
    }
    return (
      <SafeAreaView style={container}>
        <FlatList
          contentContainerStyle={listCategories}
          data={categories}
          numColumns={3}
          renderItem={({item, index}) => (
            <Category navigation={navigation} category={item} index={index} />
          )}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={
            <LoadMoreButton lengthData={categories.length} />
          }
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
