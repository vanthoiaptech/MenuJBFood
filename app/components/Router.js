import React from 'react';
import {Image, StyleSheet, View, Dimensions} from 'react-native';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import {createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {withNamespaces} from 'react-i18next';
import {Icon} from 'react-native-elements';
import Categories from './Main/Categories/Categories';
import Maps from './Main/Maps/Maps';
import Rating from './Main/Rating/Rating';
import ListRestaurants from './Main/ListRestaurants/ListRestaurants';
import MenuFoods from './Main/MenuFoods/MenuFoods';
import Menu from './Main/Menu/Menu';
import Splash from './Splash';
import LanguageSetting from './Main/LanguageSetting/LanguageSetting';

const {width} = Dimensions.get('window');
// customize header react navigation
const headerStyleCommon = {
  defaultNavigationOptions: ({navigation}) => {
    return {
      headerBackground: () => (
        <View style={styles.logoHeader}>
          <Image
            style={styles.logoImg}
            source={require('../images/logo_trang.png')}
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
        <View style={styles.headerRight}>
          <Icon
            name="bars"
            type="font-awesome"
            color="#EFD478"
            onPress={() => navigation.openDrawer()}
          />
        </View>
      ),
      headerTitleStyle: {
        textAlign: 'center',
        flexGrow: 1,
        alignSelf: 'center',
        textTransform: 'uppercase',
        fontSize: 14,
        marginLeft: 60,
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
      navigationOptions: ({navigation, screenProps}) => ({
        title: screenProps.t('categories:title'),
      }),
    },
    ListRestaurantsScreen: {
      screen: ListRestaurants,
    },
    MenuFoodsScreen: {
      screen: MenuFoods,
    },
  },
  {...headerStyleCommon},
);

// route maps
const MapsStack = createStackNavigator(
  {
    MapsScreen: {
      screen: Maps,
      navigationOptions: ({navigation, screenProps}) => ({
        title: screenProps.t('maps:title'),
      }),
    },
    MenuFoodsScreen: {
      screen: MenuFoods,
    },
  },
  {...headerStyleCommon},
);

// route rating
const RatingStack = createStackNavigator(
  {
    RatingScreen: {
      screen: Rating,
      navigationOptions: ({navigation, screenProps}) => ({
        title: screenProps.t('rating:title'),
      }),
    },
  },
  {...headerStyleCommon},
);

// route language setting
const LanguageSettingStack = createStackNavigator(
  {
    LanguageSettingScreen: {
      screen: LanguageSetting,
      navigationOptions: ({navigation, screenProps}) => ({
        title: screenProps.t('language_setting:title'),
      }),
    },
  },
  {...headerStyleCommon},
);

// route tabbar
const TabBarComponent = props => <BottomTabBar {...props} />;
const TabNavigation = createBottomTabNavigator(
  {
    Maps: {
      screen: MapsStack,
      navigationOptions: ({navigation, screenProps}) => ({
        tabBarLabel: screenProps.t('maps:title'),
        tabBarIcon: () => (
          <Image
            source={require('../images/logo_trang.png')}
            style={styles.iconStyle}
          />
        ),
      }),
    },
    Categories: {
      screen: CategoryStack,
      navigationOptions: ({navigation, screenProps}) => ({
        tabBarLabel: screenProps.t('categories:title'),
        tabBarIcon: () => (
          <Image
            source={require('../images/logo_trang.png')}
            style={styles.iconStyle}
          />
        ),
      }),
    },
    Rating: {
      screen: RatingStack,
      navigationOptions: ({navigation, screenProps}) => ({
        tabBarLabel: screenProps.t('rating:title'),
        tabBarIcon: () => (
          <Image
            source={require('../images/logo_trang.png')}
            style={styles.iconStyle}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Categories',
    tabBarPosition: 'bottom',
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

// drawer menu sidebar
const DrawerNavigator = createDrawerNavigator(
  {
    Tabbar: {
      screen: TabNavigation,
    },
    LanguageSetting: {
      screen: LanguageSettingStack,
    },
  },
  {
    drawerWidth: width / 1.5,
    drawerPosition: 'right',
    contentComponent: props => <Menu {...props} />,
  },
);

const InitialNavigator = createSwitchNavigator({
  // Splash: Splash,
  App: DrawerNavigator,
});

export default withNamespaces(['language_setting', 'common'], {wait: true})(
  InitialNavigator,
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
  headerRight: {
    marginRight: 10,
  },
});
