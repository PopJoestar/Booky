import {PermissionsAndroid} from 'react-native';

export async function requestStoragePermission() {
  const result = await PermissionsAndroid.requestMultiple([
    PermissionsAndroid.PERMISSIONS.CAMERA,
  ]);

  console.log(result);

  return 2;
}
