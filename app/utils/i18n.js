import i18n from 'i18next';
import {reactI18nextModule} from 'react-i18next';
import vi from '../locales/vi/translation.json';
import en from '../locales/en/translation.json';
import ja from '../locales/ja/translation.json';
import locale from 'react-native-locale-detector';
import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = '@languageCode';

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
    const lng = savedDataJSON ? savedDataJSON : 'ja';
    const selectLanguage = lng || locale;
    callback(selectLanguage);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'ja',
    resources: {vi, en, ja},
    keySeparator: false,
    ns: ['common'],
    defaultNS: 'common',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
