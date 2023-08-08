import {useCallback, useEffect} from 'react';
import {SettingsModel, useQuery, useRealm} from '@/database';

type Settings = {
  downloadPath: string | null;
  appearance: number;
  theme: string | null;
  language: string;
  showVPNWarning: boolean;
  hasDownloadedBook: boolean;
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
    downloadPath: setting ? setting.downloadPath : undefined,
    appearance: setting ? setting.appearance : 2,
    theme: setting ? setting.theme : undefined,
    language: setting ? setting.language : 'fr',
    updateSettings,
  };
};

export default useSettings;
