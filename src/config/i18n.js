import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from '../translations/en.json';
import pt from '../translations/pt.json';

const fallbackLng = ['en'];
const availableLanguages = ['en', 'pt'];

const options = {
  order: ['navigator'],
  lookupLocalStorage: 'i18nextLng',
  caches: ['localStorage'],
  checkWhitelist: true,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, pt },
    fallbackLng,
    whitelist: availableLanguages,
    detection: options,
    load: 'languageOnly',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
