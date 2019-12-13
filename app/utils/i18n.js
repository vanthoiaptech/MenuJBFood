import i18n from 'i18next';
import {reactI18nextModule} from 'react-i18next';
import vi from '../locales/vi/translation.json';
import en from '../locales/en/translation.json';
import ja from '../locales/ja/translation.json';
import categories_vi from '../../api/categories/categories_vi';
import locale from 'react-native-locale-detector';
// import AsyncStorage from '@react-native-community/async-storage';

// const STORAGE_KEY = '@APP:languageCode'

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    // const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
    // const lang = savedDataJSON ? savedDataJSON : null;
    const selectLanguage = locale;
    callback(selectLanguage);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    resources: {vi, en, ja, categories_vi},
    fallbackLng: 'ja',
    keySeparator: false,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
