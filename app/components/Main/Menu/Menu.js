import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {withNamespaces} from 'react-i18next';

class Menu extends Component {
  render() {
    const {container, menuItem} = styles;
    const {navigation, t} = this.props;
    return (
      <View style={container}>
        <TouchableOpacity
          style={menuItem}
          onPress={() => navigation.navigate('LanguageSetting')}>
          <Text>{t('language_setting:title')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={menuItem}>
          <Text>About us</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  menuItem: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});

export default withNamespaces(['language_setting'], {wait: true})(Menu);
