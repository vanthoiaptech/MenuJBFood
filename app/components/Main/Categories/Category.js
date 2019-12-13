import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '../../../utils/i18n';

const {width} = Dimensions.get('window');

class Category extends Component {
  render() {
    const {categoryItem, categoryItemText, imageStyle, btnWrapper} = styles;
    const {navigation, category, index} = this.props;
    const bgColors = [
      ['#C74A3F', '#B93322', '#B32B17'],
      ['#E6B81E', '#D9AF27', '#D2A91B'],
      ['#978D63', '#8A8054', '#847A4E'],
      ['#97C543', '#89B82E', '#86B423'],
    ];
    return (
      <LinearGradient
        colors={bgColors[index % bgColors.length]}
        style={categoryItem}>
        <TouchableOpacity
          style={btnWrapper}
          onPress={() =>
            navigation.navigate('ListRestaurantsScreen', {
              categoryId: category.id,
              categoryName: category.name,
            })
          }>
          <Image
            style={imageStyle}
            source={require('../../../images/logo_trang.png')}
          />
          <Text style={categoryItemText}>{category.name}</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  categoryItem: {
    borderRadius: 20,
    margin: 5,
    width: (width - 50) / 3,
    height: (width - 50) / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnWrapper: {
    alignItems: 'center',
  },
  categoryItemText: {
    color: '#FFF',
    textTransform: 'uppercase',
    fontSize: 12,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  imageStyle: {
    width: 50,
    height: 50,
    resizeMode: 'center',
    marginBottom: 10,
  },
});

export default Category;
