export class SettingsModel extends Realm.Object<SettingsModel> {
  theme?: string;
  downloadPath?: string;
  isDarkMode!: boolean;
  language!: string;

  static schema = {
    name: 'Settings',
    properties: {
      theme: 'string?',
      downloadPath: 'string?',
      isDarkMode: {type: 'bool', default: false},
      language: {type: 'string', default: 'fr'},
    },
  };
}
