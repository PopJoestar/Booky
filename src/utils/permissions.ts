import {startActivityAsync} from 'expo-intent-launcher';
import ExternalStorage from 'externalStorage';
import {Linking, PermissionsAndroid, Platform} from 'react-native';

const isAndroid11Plus = parseInt(Platform.Version.toString(), 10) >= 30;

export const redirectToManageExternalStoragePermission = async () => {
  if (isAndroid11Plus) {
    await startActivityAsync(
      'android.settings.MANAGE_ALL_FILES_ACCESS_PERMISSION',
    );
    return;
  }

  await Linking.openSettings();
};

export const requestExternalStoragePermission = async () => {
  //  android 11+
  if (isAndroid11Plus) {
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
