import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

class Splash extends Component {
  // delay 2s before go to App
  performTimeConsumingTask = async () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve('result');
      }, 2000),
    );
  };

  // action redirect to App after 2s
  async componentDidMount() {
    const data = await this.performTimeConsumingTask();
    if (data !== null) {
      this.props.navigation.navigate('App');
    }
  }

  render() {
    const {container, text, logo, textFooter} = styles;
    return (
      <View style={container}>
        <Image style={logo} source={require('../images/logo_trang.png')} />
        <Text style={text}>MENU JP FOOD</Text>
        <Text style={text}>レストランメニュー</Text>
        <Text style={textFooter}>Copyright@2019 Jibannet Asia</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00AF51',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textFooter: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 30,
  },
});

export default Splash;
