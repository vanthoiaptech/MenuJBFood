import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import i18n from '../../utils/i18n';

class Error extends Component {
  render() {
    const {container, text, button, btnText} = styles;
    return (
      <View style={container}>
        <Text style={text}>
          {i18n.t(
            'common:No internet connection. Make sure Wi-Fi or cellular data is turned on ,then try again',
          )}
        </Text>
        <TouchableOpacity style={button} onPress={this.props.retry}>
          <Text style={btnText}>{i18n.t('common:retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#00AF50',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  btnText: {
    fontSize: 16,
    color: '#FFF',
    textTransform: 'uppercase',
  },
});

export default Error;
