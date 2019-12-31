import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, FlatList, RefreshControl} from 'react-native';
import Category from './Category';
import EmptyData from '../EmptyData';
// import locale from 'react-native-locale-detector';
import categoriesVI from '../../../../api/categories/categories_vi';
import categoriesEN from '../../../../api/categories/categories_en';
import categoriesJA from '../../../../api/categories/categories_ja';
import {withNamespaces} from 'react-i18next';
import {getLanguageCode} from '../../../helpers';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: '',
      categories: [],
      refreshing: false,
    };
  }

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
    await getLanguageCode()
      .then(res =>
        this.setState({
          languageCode: res,
        }),
      )
      .catch(err => console.log(err));
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
