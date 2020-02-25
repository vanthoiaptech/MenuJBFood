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
import globals from '../../globals';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: 'ja',
      user: null,
    };
    globals.onSignIn = this.onSignIn.bind(this);
  }

  onSignIn = user => {
    this.setState({user});
  };

  async onChangeLanguage(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem('@languageCode', lang);
    } catch (error) {
      this.setState({languageCode: 'ja'});
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
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '831086411403-vl8s60r47p5fca9a196qm493p3ua5ttl.apps.googleusercontent.com',
    });
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
                  this.setState({user: null});
                } else {
                  this.setState({user: response});
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

  loginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      this.setState({user: userInfo.user});
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        console.log('Other');
      }
    }
  };

  logout = () => {
    LoginManager.logOut();
    this.setState({user: null});
  };

  render() {
    const {
      container,
      menuItem,
      menuText,
      menuBanner,
      logoMenu,
      avatar,
      menuWrapper,
      text,
      ensignIcon,
      loginButton,
      button,
      loginButtonTitle,
      divider,
    } = styles;
    const {t} = this.props;
    const {user} = this.state;

    let facebookButtonJSX = (
      <FontAwesome.Button
        name="facebook"
        style={button}
        backgroundColor="#3A63BF"
        onPress={this.loginFacebook}>
        <Text style={loginButtonTitle}>Login with Facebook</Text>
      </FontAwesome.Button>
    );
    let googleButtonJSX = (
      <FontAwesome.Button
        name="google"
        style={button}
        backgroundColor="#C94131"
        onPress={this.loginGoogle}>
        <Text style={loginButtonTitle}>Login with Google</Text>
      </FontAwesome.Button>
    );
    let logoutJSX = (
      <FontAwesome.Button
        name="sign-out"
        backgroundColor="transparent"
        color="#545659"
        onPress={this.logout}>
        <Text style={menuText}>Logout</Text>
      </FontAwesome.Button>
    );

    facebookButtonJSX = !user ? facebookButtonJSX : null;
    googleButtonJSX = !user ? googleButtonJSX : null;
    logoutJSX = user ? logoutJSX : null;
    var avatarUrl;
    if (user && user.photo) {
      avatarUrl = user.photo;
    } else if (user && user.picture) {
      avatarUrl = user.picture.data.url;
    }
    const avatarJSX = <Image style={avatar} source={{uri: avatarUrl}} />;
    const logoJSX = (
      <Image style={logoMenu} source={require('../../../images/LOGO.png')} />
    );

    return (
      <View style={container}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 1, y: 3.0}}
          locations={[0, 0.5, 0.6]}
          colors={['#FFF', '#36C075', '#7ED0A3']}
          style={menuBanner}>
          {user ? avatarJSX : logoJSX}
          <Text style={text}>{user ? user.name : 'MENU JP FOOD'}</Text>
          <Text style={text}>{user ? '' : 'レストランメニュー'}</Text>
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
          {logoutJSX}
        </View>
        <View style={loginButton}>
          {facebookButtonJSX}
          <View style={divider} />
          {googleButtonJSX}
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
    paddingVertical: 20,
    paddingHorizontal: 30,
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    resizeMode: 'cover',
    borderColor: '#FFF',
    borderWidth: 2,
  },
  text: {
    paddingTop: 3,
    color: '#575A63',
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
  button: {
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonTitle: {
    fontSize: 16,
    color: 'white',
  },
  divider: {
    height: 5,
  },
});

export default withNamespaces(['language_setting'], {wait: true})(Menu);
