import {useCallback} from 'react';
import {BookDownloadInfo} from '@/interfaces/Book';
import {BookDownloadInfoModel, useRealm} from '@/database';

const useBookDownloadInfoRepository = () => {
  const realm = useRealm();

  const addBookDownloadInfo = useCallback(
    (bookDownloadInfo: BookDownloadInfo) => {
      realm.write(() => {
        realm.create<BookDownloadInfoModel>(
          'BookDownloadInfo',
          bookDownloadInfo,
        );
      });

      return true;
    },
    [realm],
  );

  const getBookDownloadInfo = useCallback(
    (md5: string) => {
      const response = realm.objectForPrimaryKey<BookDownloadInfoModel>(
        'BookDownloadInfo',
        md5,
      );

      if (response == null) {
        return null;
      }

      return response;
    },
    [realm],
  );

  const removeBookDownloadInfo = useCallback(
    (bookMd5: string) => {
      const bookDownloadInfo = getBookDownloadInfo(bookMd5);

      if (bookDownloadInfo == null) {
        return;
      }
      realm.write(() => {
        realm.delete(bookDownloadInfo);
      });
    },
    [getBookDownloadInfo, realm],
  );

  return {addBookDownloadInfo, removeBookDownloadInfo, getBookDownloadInfo};
};

export default useBookDownloadInfoRepository;
