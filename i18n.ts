import 'intl-pluralrules';

import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'react-native-localize';
import {Locales} from './src/locales';

const DEFAULT_LANGUAGE = 'en';
const SUPPORTED_LANGUAGES = ['en'];
export const DEFAULT_NS = 'common';

const languageDetector = {
  type: 'languageDetector',
  detect: () => {
    let localLanguage = getLocales()[0].languageCode;

    if (!SUPPORTED_LANGUAGES.includes(localLanguage)) {
      localLanguage = DEFAULT_LANGUAGE;
    }

    return localLanguage;
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

//@ts-ignore
i18next.use(languageDetector).use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  resources: Locales,
  defaultNS: DEFAULT_NS,
});
