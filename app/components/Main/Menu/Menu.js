import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {withNamespaces} from 'react-i18next';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../../utils/i18n';
import RNRestart from 'react-native-restart';
import {getLanguageCode} from '../../../helpers';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: 'ja',
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

  componentDidMount() {
    getLanguageCode()
      .then(res =>
        this.setState({
          languageCode: res,
        }),
      )
      .catch(err => console.log(err));
  }

  loginFacebook = async () => {
    LoginManager.logInWithPermissions(['public_profile'])
      .then(result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken()
            .then(user => {
              return user;
            })
            .then(user => {
              const responseInfoCallback = (error, response) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(response);
                }
              };

              const infoRequest = new GraphRequest(
                '/me',
                {
                  accessToken: user.accessToken,
                  parameters: {
                    fields: {
                      string:
                        'email,name,first_name,last_name,picture.type(large)',
                    },
                  },
                },
                responseInfoCallback,
              );
              // Start the graph request.
              new GraphRequestManager().addRequest(infoRequest).start();
            });
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  logout = () => {
    LoginManager.logOut();
  };

  render() {
    console.log(this.state.isAuthenticated);
    console.log(this.state.userInfo);

    const {
      container,
      menuItem,
      menuText,
      menuBanner,
      logoMenu,
      menuWrapper,
      text,
      ensignIcon,
      loginButton,
      facebookButton,
      loginButtonTitle,
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
          <FontAwesome.Button
            name="sign-out"
            backgroundColor="transparent"
            color="#545659"
            onPress={this.logout}>
            <Text style={menuText}>Logout</Text>
          </FontAwesome.Button>
        </View>
        <View style={loginButton}>
          <FontAwesome.Button
            name="facebook"
            style={facebookButton}
            backgroundColor="#3b5998"
            onPress={this.loginFacebook}>
            <Text style={loginButtonTitle}>Login with Facebook</Text>
          </FontAwesome.Button>
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
    flex: 4,
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
  loginButton: {
    flex: 5,
    marginHorizontal: 20,
  },
  facebookButton: {
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonTitle: {
    fontSize: 16,
    color: 'white',
  },
});

export default withNamespaces(['language_setting'], {wait: true})(Menu);
