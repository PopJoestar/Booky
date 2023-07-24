import React from 'react';
import {BaseBook} from '@/types';
import BookItemUI, {BookItemUIProps} from './BookItemUI';
import {BookStatus} from '../types';
import {useBookObject} from '@/data';

type Props<T extends BaseBook> = BookItemUIProps<T> & {
  showSaved?: boolean;
};

function BookItem<T extends BaseBook>(props: Props<T>) {
  const savedBook = useBookObject(props.item.md5 ?? '');

  const getStatus = (): BookStatus | undefined => {
    if (savedBook == null) {
      return undefined;
    }

    if (savedBook.filePath !== '') {
      return 'downloaded';
    }

    return props.showSaved ? 'saved' : undefined;
  };

  return <BookItemUI {...props} status={getStatus()} />;
}

export default BookItem;
