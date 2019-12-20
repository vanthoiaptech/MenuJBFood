import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../../utils/i18n';
import {withNamespaces} from 'react-i18next';

class LanguageSetting extends Component {
  async onChangeLanguage(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem('@languageCode', lang);
    } catch (error) {
      console.log(error);
    }
    NativeModules.DevSettings.reload();
  }

  render() {
    const {container, item} = styles;
    const {t} = this.props;
    return (
      <View style={container}>
        <TouchableOpacity
          style={item}
          onPress={() => this.onChangeLanguage('en')}>
          <Text>{t('language_setting:english')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={item}
          onPress={() => this.onChangeLanguage('vi')}>
          <Text>{t('language_setting:vietnamese')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={item}
          onPress={() => this.onChangeLanguage('ja')}>
          <Text>{t('language_setting:japanese')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default withNamespaces(['language_setting', 'common'], {wait: true})(
  LanguageSetting,
);
