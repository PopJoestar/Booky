import React from 'react';
import {BaseBook} from '@/types';
import BookItemUI, {BookItemUIProps} from './BookItemUI';
import {BookStatus} from '../types';
import {useBookDownloadInfoObject, useBookObject} from '@/data';
import {useDownloadBook} from '@/hooks';

type Props<T extends BaseBook> = BookItemUIProps<T> & {
  showSaved?: boolean;
};

function BookItem<T extends BaseBook>(props: Props<T>) {
  const savedBook = useBookObject(props.item.md5 ?? '');

  const downloadInfo = useBookDownloadInfoObject(props.item.md5 ?? '');
  const {cancelDownload} = useDownloadBook();
  const getStatus = (): BookStatus | undefined => {
    if (downloadInfo != null) {
      return 'downloading';
    }

    if (savedBook == null) {
      return undefined;
    }

    if (savedBook.filePath !== '') {
      return 'downloaded';
    }

    return props.showSaved ? 'saved' : undefined;
  };

  return (
    <BookItemUI
      {...props}
      status={getStatus()}
      onCancelDownloading={item => {
        cancelDownload(item.md5!);
      }}
    />
  );
}

export default BookItem;
