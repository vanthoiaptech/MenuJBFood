import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import Categories from '../Main/Categories/Categories';
import Maps from '../Main/Maps/Maps';
import Rating from '../Main/Rating/Rating';
import {createStackNavigator} from 'react-navigation-stack';

const CategoryScreen = createStackNavigator({
  Categories: Categories,
});

const MapsScreen = createStackNavigator({
  MapsScreen: Maps,
});

const RatingScreen = createStackNavigator({
  RatingScreen: Rating,
});

const Main = createBottomTabNavigator(
  {
    Maps: MapsScreen,
    Categories: CategoryScreen,
    Rating: RatingScreen,
  },
  {
    initialRouteName: 'Categories',
  },
);

export default createAppContainer(Main);
