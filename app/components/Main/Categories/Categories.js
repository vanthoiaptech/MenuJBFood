import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import Category from './Category';
import EmptyData from '../EmptyData';
// import locale from 'react-native-locale-detector';
import {withNamespaces} from 'react-i18next';
import {getLanguageCode} from '../../../helpers';
import {getApiCategories} from '../../../../api/categories';
import Spinner from '../Spinner';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: '',
      categories: [],
      isLoading: true,
    };
  }

  getCategoriesData = () => {
    const {languageCode} = this.state;

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
      .then(res => {
        let languageCode = res ? res : 'ja';
        this.setState({
          languageCode,
        });
      })
      .catch(() =>
        this.setState({
          languageCode: 'ja',
        }),
      );
    this.getCategoriesData();
  }

  render() {
    const {categories, isLoading} = this.state;
    const {container, listCategories} = styles;
    const {navigation} = this.props;

    if (isLoading) {
      return <Spinner size="large" style="loading" />;
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
});

export default withNamespaces(['categories', 'common'], {wait: true})(
  Categories,
);
