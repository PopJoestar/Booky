import {startActivityAsync} from 'expo-intent-launcher';

export const redirectToManageExternalStoragePermission = async () => {
  await startActivityAsync(
    'android.settings.MANAGE_ALL_FILES_ACCESS_PERMISSION',
  );
};
