import {startActivityAsync} from 'expo-intent-launcher';
import ExternalStorage from 'externalStorage';

export const redirectToManageExternalStoragePermission = async () => {
  await startActivityAsync(
    'android.settings.MANAGE_ALL_FILES_ACCESS_PERMISSION',
  );
};

export const requestExternalStoragePermission = async () => {
  let isExternalStorageManager =
    await ExternalStorage.isExternalStorageManager();

  if (!isExternalStorageManager) {
    await redirectToManageExternalStoragePermission();

    isExternalStorageManager = await ExternalStorage.isExternalStorageManager();
  }

  return isExternalStorageManager;
};
