import 'intl-pluralrules';

import i18next, {Module, Resource} from 'i18next';
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

i18next
  .use(languageDetector as Module)
  .use(initReactI18next)
  .init({
    fallbackLng: DEFAULT_LANGUAGE,
    resources: Locales as unknown as Resource,
    defaultNS: DEFAULT_NS,
  });
