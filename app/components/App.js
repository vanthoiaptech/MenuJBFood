import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import globals from './globals';
import codePush from 'react-native-code-push';
import {ReloadAppOnLanguageChange} from './WrappedStack';

class App extends Component {
  constructor(props) {
    super(props);
    GoogleSignin.configure();
  }

  async componentDidMount() {
    SplashScreen.hide(); // hide splash screen when open app
    firebase.messaging().subscribeToTopic('all'); // Receive notification multi device

    this.isSignedInFacebook();
    this.isSignedInGoogle();

    PushNotification.configure({
      onNotification: function(notification) {
        console.log('NOTIFICATION:', notification);
      },
    });
  }

  /**
  Checking SignedIn Status with react-native-fbsdk
  */
  isSignedInFacebook = () => {
    AccessToken.getCurrentAccessToken()
      .then(user => {
        return user;
      })
      .then(user => {
        const responseInfoCallback = (error, response) => {
          if (error) {
            globals.onSignIn(null, false);
          } else {
            globals.onSignIn(response, true);
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
  };

  /**
    Checking SignedIn Status with google-signin
  */
  isSignedInGoogle = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      this.getCurrentUserInfo()
        .then(response => {
          globals.onSignIn(response.user, isSignedIn, true);
        })
        .catch(() => {
          globals.onSignIn(null, !isSignedIn, false);
        });
    }
  };

  /**
    Get user info is signed in with google
    @return object
  */
  getCurrentUserInfo = async () => {
    try {
      const response = await GoogleSignin.signInSilently();
      return response;
    } catch (error) {
      return null;
    }
  };

  render() {
    return <ReloadAppOnLanguageChange />;
  }
}

let codePushOptions = {
  updateDialog: true,
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
};
export default codePush(codePushOptions)(App);
