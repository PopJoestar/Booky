import {Constants} from '@/constants';
import {Book, DownloadLink} from '@/interfaces/Book';
import {getFileNameFromDownloadLink} from '@/shared/utils/request';
import * as FileSystem from 'expo-file-system';
import NotificationService from './NotificationService';
import {AndroidCategory} from '@notifee/react-native';

export type DownloadBookOptions = {
  onProgress?: FileSystem.FileSystemNetworkTaskProgressCallback<FileSystem.DownloadProgressData>;
  onDownloadResumableCreated?: (
    downloadResumable: FileSystem.DownloadResumable,
  ) => void;
  hostIndex?: number;
};

export const downloadBook = async (
  book: Book,
  options?: DownloadBookOptions,
) => {
  if (book.downloadLinks == null || book.downloadLinks.length === 0) {
    return;
  }

  const downloadLink =
    options && options.hostIndex && book.downloadLinks
      ? book.downloadLinks[options.hostIndex]
      : (getDownloadLink(book.downloadLinks) as DownloadLink);

  const filename = getFileNameFromDownloadLink(downloadLink?.link);

  const downloadResumable = FileSystem.createDownloadResumable(
    downloadLink.link,
    `${Constants.DEFAULT_DOWNLOAD_DIR}/${filename}`,
    {},
    options?.onProgress,
  );

  if (options && options.onDownloadResumableCreated) {
    options.onDownloadResumableCreated(downloadResumable);
  }

  const downloadResult = await downloadResumable.downloadAsync();

  return downloadResult;
};

export const createDownloadLifecycleNotificationHooks = async (book: Book) => {
  const downloadChannel = await NotificationService.createChannel({
    id: 'download_channel',
    name: 'Download Channel',
  });

  const init = async () =>
    await NotificationService.displayNotification({
      id: book.md5,
      title: book.title,
      android: {
        channelId: downloadChannel,
        autoCancel: false,
        category: AndroidCategory.PROGRESS,
        progress: {
          indeterminate: true,
        },
        onlyAlertOnce: true,
      },
    });

  const onProgress = async (progress: FileSystem.DownloadProgressData) => {
    await NotificationService.displayNotification({
      id: book.md5,
      title: book.title,
      body: `${(progress.totalBytesWritten / 1000000).toFixed(1)} Mo ${
        progress.totalBytesExpectedToWrite === 0
          ? ''
          : '/ ' +
            (progress.totalBytesExpectedToWrite / 1000000).toFixed(1) +
            ' Mo'
      } `,
      android: {
        autoCancel: false,
        channelId: downloadChannel,
        category: AndroidCategory.PROGRESS,
        progress: {
          current: progress.totalBytesWritten,
          max:
            progress.totalBytesExpectedToWrite === 0
              ? 10000000000000
              : progress.totalBytesExpectedToWrite,
          indeterminate: progress.totalBytesExpectedToWrite === 0,
        },
        onlyAlertOnce: true,
      },
    });
  };

  const onSuccess = async (filePath: string) => {
    await NotificationService.displayNotification({
      id: book.md5,
      title: book.title,
      body: book.authors.join(', '),
      data: {
        filePath,
      },
      android: {
        channelId: downloadChannel,
        onlyAlertOnce: true,
      },
    });
  };

  return {init, onProgress, onSuccess, notificationId: book.md5};
};

const getDownloadLink = (downloadLinks: DownloadLink[]) => {
  const index = getDefaultDownloadHostIndex(downloadLinks.length);
  if (index < 0) {
    return null;
  }
  return downloadLinks[index];
};

const getDefaultDownloadHostIndex = (downloadLinksLength: number) => {
  if (downloadLinksLength > Constants.DEFAULT_DOWNLOAD_HOST_INDEX) {
    return Constants.DEFAULT_DOWNLOAD_HOST_INDEX;
  }

  return downloadLinksLength - 1;
};

const BookService = {
  downloadBook,
  createDownloadLifecycleNotificationHooks,
  getDefaultDownloadHostIndex,
};

export default BookService;
