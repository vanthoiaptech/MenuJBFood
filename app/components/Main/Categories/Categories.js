import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import Category from './Category';
import EmptyData from '../EmptyData';
// import locale from 'react-native-locale-detector';
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
      refreshing: false,
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
    this.setState({
      refreshing: true,
    });
    let categories = categoriesJA;
    let {languageCode} = this.state;
    // if (languageCode === '') {
    //   languageCode = locale.substr(0, 2);
    // }
    if (languageCode === 'vi') {
      categories = categoriesVI;
    }
    if (languageCode === 'en') {
      categories = categoriesEN;
    }
    this.setState({
      categories: categories,
      refreshing: false,
    });
  };

  async componentDidMount() {
    await this.getStorangeValue();
    this.getCategoriesData();
  }

  onRefresh = () => {
    this.getCategoriesData();
  };

  render() {
    const {categories, refreshing} = this.state;
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
