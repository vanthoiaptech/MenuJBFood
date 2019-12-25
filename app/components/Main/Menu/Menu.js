import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {withNamespaces} from 'react-i18next';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../../utils/i18n';
import RNRestart from 'react-native-restart';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: '',
    };
  }

  async onChangeLanguage(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem('@languageCode', lang);
    } catch (error) {
      console.log(error);
    }
    RNRestart.Restart();
  }

  // show check on select language
  showChecked = lng => {
    if (this.state.languageCode !== lng) {
      return null;
    }
    return (
      <View style={styles.checkIcon}>
        <Icon name="check" color="#00557F" />
      </View>
    );
  };

  getStorangeValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@languageCode');
      if (value !== null) {
        this.setState({
          languageCode: value,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getStorangeValue();
  }

  render() {
    const {
      container,
      menuItem,
      menuText,
      menuBanner,
      logoMenu,
      menuWrapper,
      text,
      ensignIcon,
    } = styles;
    const {t} = this.props;
    return (
      <View style={container}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 1, y: 3.0}}
          locations={[0, 0.5, 0.6]}
          colors={['#01AF51', '#36C075', '#7ED0A3']}
          style={menuBanner}>
          <Image
            style={logoMenu}
            source={require('../../../images/LOGO.png')}
          />
          <Text style={text}>MENU JP FOOD</Text>
          <Text style={text}>レストランメニュー</Text>
        </LinearGradient>
        <View style={menuWrapper}>
          <TouchableOpacity
            style={menuItem}
            onPress={() => this.onChangeLanguage('ja')}>
            <Image
              style={ensignIcon}
              source={require('../../../images/icon/japan.png')}
            />
            <Text style={menuText}>{t('language_setting:japanese')}</Text>
            {this.showChecked('ja')}
          </TouchableOpacity>
          <TouchableOpacity
            style={menuItem}
            onPress={() => this.onChangeLanguage('vi')}>
            <Image
              style={ensignIcon}
              source={require('../../../images/icon/vietnam.png')}
            />
            <Text style={menuText}>{t('language_setting:vietnamese')}</Text>
            {this.showChecked('vi')}
          </TouchableOpacity>
          <TouchableOpacity
            style={menuItem}
            onPress={() => this.onChangeLanguage('en')}>
            <Image
              style={ensignIcon}
              source={require('../../../images/icon/united-kingdom.png')}
            />
            <Text style={menuText}>{t('language_setting:english')}</Text>
            {this.showChecked('en')}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  menuBanner: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
  },
  menuWrapper: {
    flex: 8,
  },
  menuItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  checkIcon: {
    flex: 2,
  },
  menuText: {
    paddingLeft: 10,
    paddingVertical: 5,
    flex: 8,
  },
  logoMenu: {
    width: 80,
    height: 80,
    marginBottom: 10,
    resizeMode: 'center',
  },
  text: {
    color: '#FFF',
  },
  ensignIcon: {
    flex: 1,
    width: 25,
    height: 20,
  },
});

export default withNamespaces(['language_setting'], {wait: true})(Menu);
