import {useCallback, useEffect, useState} from 'react';
import {useRealm} from '../database';
import {BookDownloadInfoModel} from '../models/BookDownloadInfoModel';

const useBookDownloadInfoObject = (bookMD5: string) => {
  const realm = useRealm();
  const [bookDownloadInfo, setBookDownloadInfo] = useState<
    (BookDownloadInfoModel & Realm.Object<unknown, never>) | undefined
  >(undefined);

  const bookDownloadInfoCollectionListenerCallback = useCallback(
    (
      documents: Realm.Collection<
        BookDownloadInfoModel & Realm.Object<unknown, never>
      >,
    ) => {
      const _bookDownloadInfo = documents.find(
        document => document.bookMd5 === bookMD5,
      );

      setBookDownloadInfo(_bookDownloadInfo);
    },
    [bookMD5],
  );

  useEffect(() => {
    const bookDownloadInfoCollection = realm.objects(BookDownloadInfoModel);

    bookDownloadInfoCollection?.addListener(
      bookDownloadInfoCollectionListenerCallback,
    );

    return () => {
      bookDownloadInfoCollection.removeListener(
        bookDownloadInfoCollectionListenerCallback,
      );
    };
  }, [bookDownloadInfoCollectionListenerCallback, realm]);

  return bookDownloadInfo;
};

export default useBookDownloadInfoObject;
