import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  View,
} from 'react-native';
import Category from './Category';
import EmptyData from '../EmptyData';
// import locale from 'react-native-locale-detector';
import {withNamespaces} from 'react-i18next';
import {getLanguageCode} from '../../../helpers';
import {getApiCategories} from '../../../../api/categories';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: 'ja',
      categories: [],
      isLoading: true,
    };
  }

  getCategoriesData = () => {
    let {languageCode} = this.state;
    getApiCategories(languageCode)
      .then(categories =>
        this.setState({
          categories,
          isLoading: false,
        }),
      )
      .catch(() =>
        this.setState({
          categories: [],
          isLoading: false,
        }),
      );
  };

  async componentDidMount() {
    await getLanguageCode()
      .then(languageCode =>
        this.setState({
          languageCode,
        }),
      )
      .catch(() =>
        this.setState({
          languageCode: 'ja',
        }),
      );
    this.getCategoriesData();
  }

  onRefresh = () => {
    this.getCategoriesData();
  };

  render() {
    const {categories, isLoading} = this.state;
    const {container, listCategories, spinner} = styles;
    const {navigation} = this.props;

    if (isLoading) {
      return (
        <View style={spinner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
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
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default withNamespaces(['categories', 'common'], {wait: true})(
  Categories,
);
