import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  NativeModules,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../../utils/i18n';
import {withNamespaces} from 'react-i18next';
import {Icon} from 'react-native-elements';

const {width} = Dimensions.get('window');

class LanguageSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languageCode: '',
    };
  }

  selectLanguage = languageCode => {
    this.setState({
      languageCode: languageCode,
    });
  };

  // show check on select language
  showChecked = lng => {
    if (this.state.languageCode === lng) {
      return <Icon name="check" color="#00557F" />;
    } else {
      return null;
    }
  };

  getStorangeValue = async () => {
    try {
      const value = await AsyncStorage.getItem('@languageCode');
      if (value !== null) {
        this.setState({
          languageCode: value,
        });
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  componentDidMount() {
    this.getStorangeValue();
  }

  async onChangeLanguage() {
    i18n.changeLanguage(this.state.languageCode);
    try {
      await AsyncStorage.setItem('@languageCode', this.state.languageCode);
    } catch (error) {
      console.log(error);
    }
    NativeModules.DevSettings.reload();
  }

  render() {
    const {
      modalWrapper,
      modalInner,
      header,
      content,
      footer,
      textHeader,
      contentItem,
      textContent,
      footerRight,
      footerLeft,
      textCancel,
      textDone,
    } = styles;
    const {t, visible, closeModal} = this.props;

    return (
      <Modal
        backdropColor="#000"
        backdropOpacity={0.5}
        animationType="slide"
        transparent={true}
        isVisible={visible}>
        <View style={modalWrapper}>
          <View style={modalInner}>
            <View style={header}>
              <Text style={textHeader}>
                {t('language_setting:select language')}
              </Text>
            </View>
            <View style={content}>
              <TouchableOpacity
                style={contentItem}
                onPress={() => this.selectLanguage('vi')}>
                <Text style={textContent}>
                  {t('language_setting:vietnamese')}
                </Text>
                {this.showChecked('vi')}
              </TouchableOpacity>
              <TouchableOpacity
                style={contentItem}
                onPress={() => this.selectLanguage('ja')}>
                <Text style={textContent}>
                  {t('language_setting:japanese')}
                </Text>
                {this.showChecked('ja')}
              </TouchableOpacity>
              <TouchableOpacity
                style={contentItem}
                onPress={() => this.selectLanguage('en')}>
                <Text style={textContent}>{t('language_setting:english')}</Text>
                {this.showChecked('en')}
              </TouchableOpacity>
            </View>
            <View style={footer}>
              <TouchableOpacity style={footerLeft} onPress={closeModal}>
                <Text style={textCancel}>{t('language_setting:cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={footerRight}
                onPress={() => this.onChangeLanguage()}>
                <Text style={textDone}>{t('language_setting:done')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInner: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: width - 50,
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    alignItems: 'center',
  },
  textHeader: {
    fontWeight: 'bold',
  },
  contentItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
  },
  textContent: {
    flex: 8,
  },
  footer: {
    flexDirection: 'row',
  },
  footerLeft: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#DDD',
    padding: 12,
  },
  footerRight: {
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  textCancel: {
    fontWeight: 'bold',
    color: '#CCC',
  },
  textDone: {
    fontWeight: 'bold',
    color: '#00AF51',
  },
});

export default withNamespaces(['language_setting', 'common'], {wait: true})(
  LanguageSetting,
);
