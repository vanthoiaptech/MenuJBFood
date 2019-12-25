import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {withNamespaces} from 'react-i18next';

const {width} = Dimensions.get('window');

class About extends Component {
  render() {
    const {t} = this.props;
    const {
      container,
      bannerImg,
      content,
      contentItem,
      title,
      textWrapper,
      text,
    } = styles;
    return (
      <ScrollView style={container}>
        <View>
          <Image
            style={bannerImg}
            source={require('../../../images/about-bg.jpg')}
          />
        </View>
        <View style={content}>
          <View style={contentItem}>
            <Icon name="building" type="font-awesome" color="#001F5F" />
            <View style={textWrapper}>
              <Text style={title}>{t('about:company')}</Text>
              <Text style={text}>
                {t('about:Jbannet Asia Company Limited')}
              </Text>
            </View>
          </View>
          <View style={contentItem}>
            <Icon name="home" type="font-awesome" color="#001F5F" />
            <View style={textWrapper}>
              <Text style={title}>{t('about:address')}</Text>
              <Text style={text}>
                {t('about:105, Le Loi, Hai Chau, Da Nang')}
              </Text>
            </View>
          </View>
          <View style={contentItem}>
            <Icon name="phone" type="font-awesome" color="#001F5F" />
            <View style={textWrapper}>
              <Text style={title}>{t('about:phone')}</Text>
              <Text style={text}>0123456789</Text>
            </View>
          </View>
          <View style={contentItem}>
            <Icon name="envelope" type="font-awesome" color="#001F5F" />
            <View style={textWrapper}>
              <Text style={title}>{t('about:email')}</Text>
              <Text style={text}>example@jbannetasia.com</Text>
            </View>
          </View>
          <View style={contentItem}>
            <Icon name="globe" type="font-awesome" color="#001F5F" />
            <View style={textWrapper}>
              <Text style={title}>{t('about:website')}</Text>
              <Text style={text}>example.com</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  bannerImg: {
    width: width,
    height: 200,
  },
  content: {
    paddingHorizontal: 20,
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#CCC',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#001F5F',
  },
  textWrapper: {
    marginLeft: 15,
  },
  text: {
    color: '#7E7E7E',
  },
});

export default withNamespaces(['about', 'common'], {wait: true})(About);
