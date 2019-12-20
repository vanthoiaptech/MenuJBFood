import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, FlatList, Alert} from 'react-native';
import Category from './Category';
import LoadMoreButton from '../LoadMoreButton';
import EmptyData from '../EmptyData';
import locale from 'react-native-locale-detector';
import categoriesVI from '../../../../api/categories/categories_vi';
import categoriesEN from '../../../../api/categories/categories_en';
import categoriesJA from '../../../../api/categories/categories_ja';
import AsyncStorage from '@react-native-community/async-storage';
import {withNamespaces} from 'react-i18next';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: '',
      categories: [],
    };
  }

  // get language saved AsyncStorage
  getStorangeValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@languageCode');
      if (value !== null) {
        this.setState({
          languageCode: value,
        });
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  getCategoriesData = () => {
    let categories = categoriesJA;
    let {languageCode} = this.state;
    let lng = languageCode;
    if (languageCode === '') {
      lng = locale.substr(0, 2);
    }
    if (lng === 'vi') {
      categories = categoriesVI;
    }
    if (lng === 'en') {
      categories = categoriesEN;
    }
    this.setState({
      categories: categories,
    });
  };

  async componentDidMount() {
    await this.getStorangeValue();
    this.getCategoriesData();
  }

  render() {
    const {categories} = this.state;
    const {container, listCategories} = styles;
    const {navigation} = this.props;

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

export default withNamespaces(['categories', 'common'], {wait: true})(
  Categories,
);
