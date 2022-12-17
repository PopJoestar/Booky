import {Locales} from './src/locales';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: typeof Locales['en'];
  }
}
