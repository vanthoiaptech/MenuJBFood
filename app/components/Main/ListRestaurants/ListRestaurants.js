import React, {Component} from 'react';
import {FlatList, SafeAreaView, RefreshControl} from 'react-native';
// import locale from 'react-native-locale-detector';
import {getLanguageCode} from '../../../helpers';
import Restaurant from './Restaurant';
import EmptyData from '../EmptyData';
import Spinner from '../Spinner';
import Error from '../Error';
import {domain} from '../../../constants/urlDefine';

class ListRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: '',
      listRestaurants: [],
      isLoading: false,
      hasScrolled: false,
      page: 1,
      restaurantNextPage: [],
      isRefreshing: false,
      error: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoryName'),
    };
  };

  // get restaurants data from backend
  getListRestaurantsByCategoryId = async id => {
    this.setState({isLoading: true});
    const {languageCode, page, listRestaurants} = this.state;
    try {
      let response = await fetch(
        `${domain}/api/restaurants/${languageCode}/${id}?page=${page}`,
      );
      let responseJson = await response.json();
      this.setState({
        listRestaurants: [...listRestaurants, ...responseJson.data],
        isLoading: false,
        restaurantNextPage: responseJson.data,
        isRefreshing: false,
        error: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true,
        isRefreshing: false,
      });
    }
  };

  async componentDidMount() {
    const {categoryId} = this.props.navigation.state.params;
    await getLanguageCode()
      .then(res => {
        const languageCode = res ? res : 'ja';
        this.setState({
          languageCode,
        });
      })
      .catch(() =>
        this.setState({
          languageCode: 'ja',
        }),
      );
    this.getListRestaurantsByCategoryId(categoryId);
  }

  onScroll = () => {
    this.setState({hasScrolled: true});
  };

  // handle load more Restaurants data from backend when scroll to the bottom
  handleLoadMore = () => {
    if (!this.state.hasScrolled) {
      return;
    }
    const {categoryId} = this.props.navigation.state.params;
    const {isLoading, restaurantNextPage} = this.state;
    if (!isLoading && restaurantNextPage.length > 0) {
      this.setState(
        {
          page: this.state.page + 1,
          isLoading: true,
        },
        () => this.getListRestaurantsByCategoryId(categoryId),
      );
    }
  };

  // handle refresh restaurants data
  onRefresh = async () => {
    const {categoryId} = this.props.navigation.state.params;
    const {languageCode} = this.state;
    this.setState({
      isRefreshing: true,
      page: 1,
    });

    try {
      let response = await fetch(
        `${domain}/api/restaurants/${languageCode}/${categoryId}?page=1`,
      );
      let responseJson = await response.json();
      this.setState({
        listRestaurants: responseJson.data,
        restaurantNextPage: responseJson.data,
        isLoading: false,
        isRefreshing: false,
        error: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        error: true,
        isRefreshing: false,
        listRestaurants: [],
        restaurantNextPage: [],
      });
    }
  };

  // spinner load more data
  renderFooter = () => {
    if (!this.state.isLoading) {
      return null;
    }
    return <Spinner size="small" />;
  };

  render() {
    const {navigation} = this.props;
    const {listRestaurants, isLoading, page, error} = this.state;
    const {categoryId} = this.props.navigation.state.params;

    if (isLoading && page === 1) {
      return <Spinner size="large" style="loading" />;
    }

    if (error) {
      return (
        <Error retry={() => this.getListRestaurantsByCategoryId(categoryId)} />
      );
    }

    if (listRestaurants.length <= 0) {
      return <EmptyData />;
    }

    return (
      <SafeAreaView>
        <FlatList
          data={listRestaurants}
          renderItem={({item}) => (
            <Restaurant restaurant={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={() => this.handleLoadMore()}
          ListFooterComponent={() => this.renderFooter()}
          onScroll={() => this.onScroll()}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onRefresh()}
              colors={['#0000FF']}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

export default ListRestaurants;
