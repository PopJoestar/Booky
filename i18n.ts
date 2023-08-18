import 'intl-pluralrules';

import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {Locales} from './src/locales';

const DEFAULT_LANGUAGE = 'en';
export const DEFAULT_NS = 'common';

i18next.use(initReactI18next).init({
  fallbackLng: DEFAULT_LANGUAGE,
  resources: Locales,
  defaultNS: DEFAULT_NS,
});
