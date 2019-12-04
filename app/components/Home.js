import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

class Home extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {navigation} = this.props;
    const {container, text} = styles;
    return (
      <View style={container}>
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Text style={text}>MENU JP FOOD</Text>
          <Text style={text}>"Translate to JP"</Text>
        </TouchableOpacity>
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
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default Home;
