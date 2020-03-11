import React, {Component} from 'react';
import Router from './Router';
import {createAppContainer} from 'react-navigation';
import {withNamespaces} from 'react-i18next';

class WrappedStack extends Component {
  static router = Router.router;
  render() {
    const {t} = this.props;
    return <Router screenProps={{t}} {...this.props} />;
  }
}

export const ReloadAppOnLanguageChange = withNamespaces('common', {
  bindI18n: 'languageChanged',
  bindStore: false,
})(createAppContainer(WrappedStack));
