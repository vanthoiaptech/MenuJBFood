import React, {Component} from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
// import locale from 'react-native-locale-detector';
import {getLanguageCode} from '../../../helpers';
import Restaurant from './Restaurant';
import EmptyData from '../EmptyData';
import {getApiRestaurants} from '../../../../api/restaurants';

class ListRestaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: 'ja',
      listRestaurants: [],
      isLoading: false,
      hasScrolled: false,
      page: 1,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('categoryName'),
    };
  };

  // get restaurants data from api backend
  getListRestaurantsByCategoryId = id => {
    let {languageCode, page} = this.state;
    this.setState({isLoading: true});
    getApiRestaurants(languageCode, id, page)
      .then(restaurant =>
        this.setState({
          listRestaurants: this.state.listRestaurants.concat(restaurant.data),
          isLoading: false,
          totalPage: restaurant.last_page,
        }),
      )
      .catch(() => {
        this.setState({
          listRestaurants: [],
          isLoading: false,
        });
      });
  };

  async componentDidMount() {
    const {categoryId} = this.props.navigation.state.params;
    await getLanguageCode()
      .then(res =>
        this.setState({
          languageCode: res,
        }),
      )
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
    if (!this.state.isLoading) {
      this.setState({
        isLoading: true,
      });
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => this.getListRestaurantsByCategoryId(categoryId),
      );
    }
  };

  // spinner load more data
  renderFooter = () => {
    if (!this.state.isLoading) {
      return null;
    }
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  render() {
    const {navigation} = this.props;
    const {listRestaurants, isLoading, flatList, page} = this.state;
    const {spinner} = styles;

    if (isLoading && page === 1) {
      return (
        <View style={spinner}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (listRestaurants.length <= 0) {
      return <EmptyData />;
    }

    return (
      <SafeAreaView>
        <FlatList
          style={flatList}
          data={listRestaurants}
          renderItem={({item}) => (
            <Restaurant restaurant={item} navigation={navigation} />
          )}
          keyExtractor={item => item.id.toString()}
          onEndReachedThreshold={0.01}
          onEndReached={() => this.handleLoadMore()}
          ListFooterComponent={() => this.renderFooter()}
          onScroll={() => this.onScroll()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default ListRestaurants;
