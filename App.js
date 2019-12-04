import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Home from './app/components/Home';
import Main from './app/components/Main/';
import Categories from './app/components/Main/Categories/Categories';
import Rating from './app/components/Main/Rating/Rating';
import Maps from './app/components/Main/Maps/Maps';

const App= createStackNavigator(
  {
    Home: Home,
    Main: Main,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(App);
