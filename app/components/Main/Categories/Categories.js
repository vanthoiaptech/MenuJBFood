import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, FlatList, View, Text} from 'react-native';
import categories from '../../../../api/categories';
import Category from './Category';
import LoadMoreButton from '../LoadMoreButton';
import EmptyData from '../EmptyData';

import i18n from '../../../utils/i18n';

class Categories extends Component {
  render() {
    const {container, listCategories} = styles;
    const {navigation} = this.props;
    if (categories.length <= 0) {
      return <EmptyData />;
    }
    return (
      <SafeAreaView style={container}>
        <View>
          <Text>{i18n.t('welcome')}</Text>
        </View>
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
