import React, {Component} from 'react';
import Router from './Router';
import {withNamespaces} from 'react-i18next';
import {createAppContainer} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import globals from './globals';

class WrappedStack extends Component {
  static router = Router.router;
  render() {
    const {t} = this.props;
    return <Router screenProps={{t}} {...this.props} />;
  }
}

const ReloadAppOnLanguageChange = withNamespaces('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(createAppContainer(WrappedStack));

class App extends Component {
  async componentDidMount() {
    SplashScreen.hide(); // hide splash screen when open app
    firebase.messaging().subscribeToTopic('all'); // Receive notification multi device
    AccessToken.getCurrentAccessToken()
      .then(user => {
        return user;
      })
      .then(user => {
        const responseInfoCallback = (error, response) => {
          if (error) {
            globals.onSignIn(null);
          } else {
            globals.onSignIn(response);
          }
        };
        if (user) {
          const infoRequest = new GraphRequest(
            '/me',
            {
              accessToken: user.accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,last_name,picture.type(large)',
                },
              },
            },
            responseInfoCallback,
          );
          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      });
    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
    });
  }

  render() {
    return <ReloadAppOnLanguageChange />;
  }
}

export default App;
