import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../../utils/i18n';

class LanguageSetting extends Component {
  async onChangeLanguage(lang) {
    i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem('@APP:languageCode', lang);
    } catch (error) {
      Alert.alert(error);
    }
    console.log(i18n.dir());
  }
  render() {
    const {container, item} = styles;
    return (
      <View style={container}>
        <TouchableOpacity
          style={item}
          onPress={() => this.onChangeLanguage('en')}>
          <Text>English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={item}
          onPress={() => this.onChangeLanguage('vi')}>
          <Text>Tiếng Việt</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={item}
          onPress={() => this.onChangeLanguage('ja')}>
          <Text>日本語</Text>
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

export default LanguageSetting;
