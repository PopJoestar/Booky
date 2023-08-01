import {NativeModules} from 'react-native';

interface IExternalStorageModule {
  isExternalStorageManager(): Promise<boolean>;
}

const {ExternalStorageModule} = NativeModules as {
  ExternalStorageModule: IExternalStorageModule;
};

export const isExternalStorageManager = () => {
  return ExternalStorageModule.isExternalStorageManager();
};
