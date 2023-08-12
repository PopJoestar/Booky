import {startActivityAsync} from 'expo-intent-launcher';
import ExternalStorage from 'externalStorage';
import {PermissionsAndroid, Platform} from 'react-native';

export const redirectToManageExternalStoragePermission = async () => {
  await startActivityAsync(
    'android.settings.MANAGE_ALL_FILES_ACCESS_PERMISSION',
  );
};

export const requestExternalStoragePermission = async () => {
  //  android 11+
  if (parseInt(Platform.Version.toString(), 10) >= 30) {
    let isExternalStorageManager =
      await ExternalStorage.isExternalStorageManager();

    if (!isExternalStorageManager) {
      await redirectToManageExternalStoragePermission();

      isExternalStorageManager =
        await ExternalStorage.isExternalStorageManager();
    }
    return isExternalStorageManager;
  }

  const isGranted = await requestStoragePermission();

  return isGranted;
};

const requestStoragePermission = async () => {
  const result = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  ]);

  return (
    result[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
      'granted' &&
    result[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === 'granted'
  );
};
