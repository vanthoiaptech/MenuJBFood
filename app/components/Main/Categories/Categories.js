import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

class Categories extends Component {
  render() {
    const {
      container,
      categoryItem,
      categoryButton,
      btnWrapper,
      categoriesWrapper,
      btnGradient,
      button,
      iconButton,
      btnText,
      categoryItemText,
    } = styles;
    const {navigation} = this.props;
    return (
      <View style={container}>
        <View style={categoriesWrapper}>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
          <LinearGradient
            colors={['#E8723D', '#DA6423', '#D35D16']}
            style={categoryItem}>
            <TouchableOpacity
              style={categoryButton}
              onPress={() => navigation.navigate('ListRestaurantsScreen')}>
              <Image source={require('../../../../images/icon/tab-icon.png')} />
              <Text style={categoryItemText}>Hải sản</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
        <View style={btnWrapper}>
          <LinearGradient
            colors={['#C74A3F', '#B93322', '#B32B17']}
            style={btnGradient}>
            <TouchableOpacity style={button}>
              <Image
                style={iconButton}
                source={require('../../../../images/icon/tab-icon.png')}
              />
              <Text style={btnText}>Load more</Text>
              <Image
                style={iconButton}
                source={require('../../../../images/icon/tab-icon.png')}
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
  },
  categoriesWrapper: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  categoryItem: {
    borderRadius: 20,
    margin: 5,
  },
  categoryButton: {
    width: (width - 50) / 3,
    height: (width - 50) / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWrapper: {
    flex: 1,
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
});

export default Categories;
