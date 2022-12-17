import {Locales} from './src/locales';
import {DEFAULT_NS} from './i18n';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: typeof Locales['en'];
  }
}
