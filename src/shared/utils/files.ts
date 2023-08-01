import * as FileSystem from 'expo-file-system';
import {startActivityAsync} from 'expo-intent-launcher';

export function getMimeType(filename: string) {
  const fileExtension = filename.split('.').pop();
  switch (fileExtension) {
    case 'pdf':
      return 'application/pdf';
    case 'zip':
    case 'epub':
      return 'application/epub+zip';
    case 'djvu':
      return 'application/djvu';
    default:
      return `application/${fileExtension}`;
  }
}

/**
 * Open a file URI (file://) with a third party app
 * @param {string} fileUri the path of the file
 */
export const openFileWithThirdPartyApp = async (fileUri: string) => {
  const fileSafUri = await FileSystem.getContentUriAsync(fileUri);

  startActivityAsync('android.intent.action.VIEW', {
    data: fileSafUri,
    flags: 1,
  });
};
