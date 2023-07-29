import {useBookDownloadInfoRepository, useBookRepository} from '@/data';
import {Book} from '@/interfaces/Book';
import {NotificationService, BookService} from '@/services';
import {DownloadBookOptions} from '@/services/BookService';
import {AuthorizationStatus} from '@notifee/react-native';
import * as FileSystem from 'expo-file-system';
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

      removeBookDownloadInfo(book.md5!);

      displaySuccessNotification(downloadResult.uri);
    } catch (e) {
      removeBookDownloadInfo(book.md5!);

      await NotificationService.cancelNotification(book.md5!);

      console.log(e);
    }
  };

  const cancelDownload = async (bookMd5: string) => {
    const bookDownloadInfo = getBookDownloadInfo(bookMd5);

    if (bookDownloadInfo == null) {
      return;
    }

    const downloadResumable = new FileSystem.DownloadResumable(
      bookDownloadInfo.url,
      bookDownloadInfo.fileUri,
    );

    console.log(bookMd5, downloadResumable);

    await downloadResumable.cancelAsync();

    removeBookDownloadInfo(bookMd5);
  };

  const isDownloadingBook = (bookMd5: string) =>
    getBookDownloadInfo(bookMd5) != null;

  return {downloadBook, cancelDownload, isDownloadingBook};
};

export default useDownloadBook;
