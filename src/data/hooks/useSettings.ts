import {useCallback, useEffect} from 'react';
import {useQuery, useRealm} from '../database';
import {SettingsModel} from '../models/SettingsModel';

type Settings = {
  downloadPath: string | null;
  isDarkMode: boolean | null;
  theme: string | null;
  language: string;
};

const useSettings = () => {
  const realm = useRealm();

  const [setting] = useQuery(SettingsModel);

  useEffect(() => {
    if (setting === undefined) {
      realm.write(() => {
        //@ts-ignore
        realm.create<SettingsModel>('Settings', {
          downloadPath: null,
          isDarkMode: false,
          theme: null,
          language: 'fr',
        });
      });
    }
  }, [realm, setting]);

  const updateSettings = useCallback(
    (newSettings: Partial<Settings>) => {
      if (setting == null) {
        return;
      }

      realm.write(() => {
        for (const key in newSettings) {
          //@ts-ignore
          setting[key] = newSettings[key];
        }
      });
    },
    [realm, setting],
  );

  return {
    downloadPath: setting ? setting.downloadPath : null,
    isDarkMode: setting ? setting.isDarkMode : false,
    theme: setting ? setting.theme : null,
    language: setting ? setting.language : 'fr',
    updateSettings,
  };
};

export default useSettings;
