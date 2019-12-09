import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

class LoadMoreButton extends Component {
  render() {
    const {btnWrapper, btnGradient, button, iconButton, btnText} = styles;
    return (
      <View style={btnWrapper}>
        <LinearGradient
          colors={['#C74A3F', '#B93322', '#B32B17']}
          style={btnGradient}>
          <TouchableOpacity style={button}>
            <Image
              style={iconButton}
              source={require('../../images/logo_trang.png')}
            />
            <Text style={btnText}>Load more</Text>
            <Image
              style={iconButton}
              source={require('../../images/logo_trang.png')}
            />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnGradient: {
    borderRadius: 8,
    width: width / 2,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  iconButton: {
    width: 20,
    height: 20,
    resizeMode: 'center',
  },
  btnText: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 14,
  },
  categoryItemText: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'center',
    marginBottom: 10,
  },
});

export default LoadMoreButton;
