import {Book} from '@/interfaces/Book';
import {NotificationService, BookService} from '@/services';
import {DownloadBookOptions} from '@/services/BookService';
import {AuthorizationStatus} from '@notifee/react-native';
import * as FileSystem from 'expo-file-system';
import useBookDownloadInfoRepository from './useBookDownloadInfoRepository';
import useBookRepository from './useBookRepository';

const tem: {[key: string]: FileSystem.DownloadResumable} = {};

const useDownloadBook = () => {
  const {addBookDownloadInfo, getBookDownloadInfo, removeBookDownloadInfo} =
    useBookDownloadInfoRepository();
  const {updateBook} = useBookRepository();

  const downloadBook = async (book: Book, selectedHostIndex?: number) => {
    if (book.downloadLinks == null || book.downloadLinks.length === 0) {
      return;
    }

    try {
      const notificationSettings =
        await NotificationService.requestNotificationPermission();

      let onDownloadProgress: DownloadBookOptions['onProgress'] | undefined;
      let displaySuccessNotification:
        | ((filePath: string) => Promise<void>)
        | undefined;

      if (
        notificationSettings === AuthorizationStatus.AUTHORIZED ||
        notificationSettings === AuthorizationStatus.PROVISIONAL
      ) {
        const {
          init: initDownloadBookNotification,
          onProgress,
          onSuccess,
        } = await BookService.createDownloadLifecycleNotificationHooks(book);

        await initDownloadBookNotification();

        onDownloadProgress = onProgress;
        displaySuccessNotification = onSuccess;
      }

      const downloadResult = await BookService.downloadBook(book, {
        onProgress: onDownloadProgress,
        hostIndex: selectedHostIndex,
        onDownloadResumableCreated: _downloadResumable => {
          tem[book.md5!] = _downloadResumable;
          const savable = _downloadResumable.savable();
          addBookDownloadInfo({
            url: savable.url,
            fileUri: savable.fileUri,
            bookMd5: book.md5!,
          });
        },
      });

      if (downloadResult == null || displaySuccessNotification == null) {
        await NotificationService.cancelNotification(book.md5!);
        return;
      }

      updateBook(book.md5!, {filePath: downloadResult.uri});

      await displaySuccessNotification(downloadResult.uri);

      removeBookDownloadInfo(book.md5!);
    } catch (e) {
      console.log(e);
      removeBookDownloadInfo(book.md5!);
      await NotificationService.cancelNotification(book.md5!);
    }
  };

  const cancelDownload = async (bookMd5: string) => {
    if (tem[bookMd5]) {
      await tem[bookMd5].cancelAsync();
    }
    removeBookDownloadInfo(bookMd5);

    await NotificationService.cancelNotification(bookMd5);
  };

  const isDownloadingBook = (bookMd5: string) =>
    getBookDownloadInfo(bookMd5) != null;

  return {downloadBook, cancelDownload, isDownloadingBook};
};

export default useDownloadBook;
