import {Book} from '@/interfaces/Book';
import {NotificationService, BookService} from '@/services';
import {DownloadBookOptions} from '@/services/BookService';
import {AuthorizationStatus} from '@notifee/react-native';

const useDownloadBook = () => {
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
      });

      console.log('useDownloadBook download result', downloadResult);

      if (downloadResult == null || displaySuccessNotification == null) {
        await NotificationService.cancelNotification(book.md5!);
        return;
      }

      displaySuccessNotification(downloadResult.uri);
    } catch (e) {
      await NotificationService.cancelNotification(book.md5!);

      console.log(e);
    }
  };

  return {downloadBook};
};

export default useDownloadBook;
