import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Categories from '../Main/Categories/Categories';
import Maps from '../Main/Maps/Maps';
import Rating from '../Main/Rating/Rating';
import ListRestaurants from './ListRestaurants/ListRestaurants';
import MenuFoods from './MenuFoods/MenuFoods';

// route categories
const CategoryStack = createStackNavigator({
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
});

// route maps
const MapsStack = createStackNavigator({
  MenuFoodsScreen: {
    screen: MenuFoods,
    navigationOptions: {
      title: 'MenuFoods',
    },
  },
  MapsScreen: {
    screen: Maps,
    navigationOptions: {
      title: 'Bản đồ',
    },
  },
});

// route rating
const RatingStack = createStackNavigator({
  RatingScreen: {
    screen: Rating,
    navigationOptions: {
      title: 'Rating',
    },
  },
});

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
            source={require('../../images/icon/tab-icon.png')}
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
            source={require('../../images/icon/tab-icon.png')}
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
            source={require('../../images/icon/tab-icon.png')}
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
    width: 30,
    height: 30,
  },
  tabBarStyle: {
    borderTopWidth: 0,
  },
});

export default createAppContainer(TabNavigation);
