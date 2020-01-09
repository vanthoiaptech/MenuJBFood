import React, {Component} from 'react';
import {FlatList, SafeAreaView, RefreshControl} from 'react-native';
// import locale from 'react-native-locale-detector';
import {getLanguageCode} from '../../../helpers';
import Restaurant from './Restaurant';
import EmptyData from '../EmptyData';
import {getApiRestaurants} from '../../../../api/restaurants';
import Spinner from '../Spinner';

class ListRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: 'ja',
      listRestaurants: [],
      isLoading: false,
      hasScrolled: false,
      page: 1,
      restaurantNextPage: [],
      isRefreshing: false,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoryName'),
    };
  };

  // get restaurants data from backend
  getListRestaurantsByCategoryId = id => {
    const {languageCode, page, listRestaurants} = this.state;
    this.setState({isLoading: true});
    getApiRestaurants(languageCode, id, page)
      .then(restaurant =>
        this.setState({
          listRestaurants: [...listRestaurants, ...restaurant.data],
          isLoading: false,
          restaurantNextPage: restaurant.data,
          isRefreshing: false,
        }),
      )
      .catch(() => {
        this.setState({
          listRestaurants: [],
          isLoading: false,
          restaurantNextPage: [],
          isRefreshing: false,
        });
      });
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
  onRefresh = () => {
    const {categoryId} = this.props.navigation.state.params;
    const {languageCode} = this.state;
    this.setState({
      isRefreshing: true,
      page: 1,
    });

    getApiRestaurants(languageCode, categoryId, 1)
      .then(restaurant =>
        this.setState({
          listRestaurants: restaurant.data,
          restaurantNextPage: restaurant.data,
          isRefreshing: false,
        }),
      )
      .catch(() => {
        this.setState({
          listRestaurants: [],
          isRefreshing: false,
        });
      });
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
    const {listRestaurants, isLoading, page} = this.state;

    if (isLoading && page === 1) {
      return <Spinner size="large" style="loading" />;
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
