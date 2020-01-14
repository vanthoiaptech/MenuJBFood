import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, FlatList} from 'react-native';
import Category from './Category';
import EmptyData from '../EmptyData';
// import locale from 'react-native-locale-detector';
import {withNamespaces} from 'react-i18next';
import {getLanguageCode} from '../../../helpers';
import Spinner from '../Spinner';
import Error from '../Error';
import {domain} from '../../../constants/urlDefine';

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: '',
      categories: [],
      isLoading: false,
      error: false,
    };
  }

  getCategoriesData = async () => {
    this.setState({isLoading: true});
    const {languageCode} = this.state;
    try {
      let response = await fetch(`${domain}/api/categories/${languageCode}`);
      let categories = await response.json();
      this.setState({
        categories,
        isLoading: false,
        error: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true,
      });
    }
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
    const {categories, isLoading, error} = this.state;
    const {container, listCategories} = styles;
    const {navigation} = this.props;

    if (isLoading) {
      return <Spinner size="large" style="loading" />;
    }

    if (error) {
      return <Error retry={() => this.getCategoriesData()} />;
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
