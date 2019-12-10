import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';
import Categories from '../Main/Categories/Categories';
import Maps from '../Main/Maps/Maps';
import Rating from '../Main/Rating/Rating';
import ListRestaurants from './ListRestaurants/ListRestaurants';
import MenuFoods from './MenuFoods/MenuFoods';
import MapDirections from './Maps/MapDirections';

// customize header react navigation
const headerStyleCommon = {
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerBackground: () => (
        <View style={styles.logoHeader}>
          <Image
            style={styles.logoImg}
            source={require('../../images/logo_trang.png')}
          />
        </View>
      ),
      headerBackImage: () => (
        <View style={styles.backButton}>
          <Icon
            name="chevron-circle-left"
            type="font-awesome"
            color="#FFF"
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
      headerRight: () => (
        <View style={styles.iconMenu}>
          <Icon
            name="bars"
            type="font-awesome"
            color="#EFD478"
            onPress={() => alert('test')}
          />
        </View>
      ),
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontSize: 18,
      },
      headerStyle: {
        backgroundColor: '#00AF50',
        height: 60,
      },
      headerTintColor: '#fff',
    };
  },
};

// route categories
const CategoryStack = createStackNavigator(
  {
    CategoriesScreen: {
      screen: Categories,
      navigationOptions: {
        title: 'Categories',
      },
    },
    ListRestaurantsScreen: {
      screen: ListRestaurants,
      navigationOptions: {
        title: 'ListRestaurants',
      },
    },
    MenuFoodsScreen: {
      screen: MenuFoods,
      navigationOptions: {
        title: 'MenuFoods',
      },
    },
  },
  {...headerStyleCommon},
);

// route maps
const MapsStack = createStackNavigator(
  {
    MapsScreen: {
      screen: Maps,
      navigationOptions: {
        title: 'Bản đồ',
      },
    },
    MenuFoodsScreen: {
      screen: MenuFoods,
      navigationOptions: {
        title: 'MenuFoods',
      },
    },
    MapDirectionsScreen: {
      screen: MapDirections,
      navigationOptions: {
        title: 'MapDirections',
      },
    },
  },
  {...headerStyleCommon},
);

// route rating
const RatingStack = createStackNavigator(
  {
    RatingScreen: {
      screen: Rating,
      navigationOptions: {
        title: 'Rating',
      },
    },
  },
  {...headerStyleCommon},
);

// route tab bar
const TabBarComponent = props => <BottomTabBar {...props} />;
const TabNavigation = createBottomTabNavigator(
  {
    Maps: {
      screen: MapsStack,
      navigationOptions: {
        tabBarLabel: 'Bản đồ',
        tabBarIcon: () => (
          <Image
            source={require('../../images/logo_trang.png')}
            style={styles.iconStyle}
          />
        ),
      },
    },
    Categories: {
      screen: CategoryStack,
      navigationOptions: {
        tabBarLabel: 'Thể loại',
        tabBarIcon: () => (
          <Image
            source={require('../../images/logo_trang.png')}
            style={styles.iconStyle}
          />
        ),
      },
    },
    Rating: {
      screen: RatingStack,
      navigationOptions: {
        tabBarLabel: 'Đánh giá',
        tabBarIcon: () => (
          <Image
            source={require('../../images/logo_trang.png')}
            style={styles.iconStyle}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Maps',
    tabBarOptions: {
      inactiveBackgroundColor: '#54A121',
      activeBackgroundColor: '#C23017',
      style: {
        borderTopWidth: 0,
      },
      labelStyle: {
        textTransform: 'uppercase',
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 12,
      },
    },
    tabBarComponent: props => (
      <TabBarComponent {...props} style={styles.tabBarStyle} />
    ),
  },
);

const styles = StyleSheet.create({
  iconStyle: {
    flex: 1,
    width: 20,
    height: 20,
    resizeMode: 'center',
  },
  tabBarStyle: {
    borderTopWidth: 0,
  },
  logoHeader: {
    marginLeft: 10,
    height: 60,
    justifyContent: 'center',
  },
  logoImg: {
    width: 50,
    height: 50,
    resizeMode: 'center',
  },
  backButton: {
    marginLeft: 60,
  },
  iconMenu: {
    marginRight: 10,
  },
});

export default createAppContainer(TabNavigation);
