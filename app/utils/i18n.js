import i18n from 'i18next';
import {reactI18nextModule} from 'react-i18next';
import translationVI from '../locales/vi/translation.json';
import translationEN from '../locales/en/translation.json';
import translationJA from '../locales/ja/translation.json';

const resources = {
  vi: {
    translation: translationVI,
  },
  en: {
    translation: translationEN,
  },
  ja: {
    translation: translationJA,
  },
};

i18n
  .use('en')
  .use(reactI18nextModule)
  .init({
    resources,
    fallbackLng: 'ja',
    lng: 'ja',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
