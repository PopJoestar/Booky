export class SettingsModel extends Realm.Object<SettingsModel> {
  theme?: string;
  downloadPath?: string;
  isDarkMode!: boolean;
  language!: string;
  showVPNWarning!: boolean;
  hasDownloadedBook!: boolean;

  static schema = {
    name: 'Settings',
    properties: {
      theme: 'string?',
      downloadPath: 'string?',
      isDarkMode: {type: 'bool', default: false},
      language: {type: 'string', default: 'fr'},
      showVPNWarning: {type: 'bool', default: true},
      hasDownloadedBook: {type: 'bool', default: true},
    },
  };
}
