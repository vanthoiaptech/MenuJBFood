import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {withNamespaces} from 'react-i18next';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import LanguageSetting from './LanguageSetting';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  render() {
    const {
      container,
      menuItem,
      menuText,
      menuBanner,
      logoMenu,
      menuWrapper,
      text,
    } = styles;
    const {t} = this.props;
    const {isModalVisible} = this.state;
    return (
      <View style={container}>
        <LanguageSetting
          visible={isModalVisible}
          closeModal={() => this.toggleModal()}
        />
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
          <TouchableOpacity style={menuItem} onPress={() => this.toggleModal()}>
            <Icon name="language" />
            <Text style={menuText}>{t('language_setting:title')}</Text>
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
  menuText: {
    paddingLeft: 5,
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
});

export default withNamespaces(['language_setting'], {wait: true})(Menu);
