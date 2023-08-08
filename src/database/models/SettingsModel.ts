export class SettingsModel extends Realm.Object<SettingsModel> {
  theme?: string;
  downloadPath?: string;
  appearance!: number;
  language!: string;
  showVPNWarning!: boolean;
  hasDownloadedBook!: boolean;

  static schema = {
    name: 'Settings',
    properties: {
      theme: {type: 'string', default: 'dynamic'},
      downloadPath: 'string?',
      appearance: {type: 'int', default: 2},
      language: {type: 'string', default: 'fr'},
      showVPNWarning: {type: 'bool', default: true},
      hasDownloadedBook: {type: 'bool', default: true},
    },
  };
}
