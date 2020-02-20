import React, {Component} from 'react';
import Router from './Router';
import {withNamespaces} from 'react-i18next';
import {createAppContainer} from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import firebase from 'react-native-firebase';

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
