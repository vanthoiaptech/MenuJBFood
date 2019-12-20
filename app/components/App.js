import React, {Component} from 'react';
import Router from './Router';
import {withNamespaces} from 'react-i18next';
import {createAppContainer} from 'react-navigation';

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
  render() {
    return <ReloadAppOnLanguageChange />;
  }
}

export default App;
