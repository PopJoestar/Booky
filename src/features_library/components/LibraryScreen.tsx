import React from 'react';
import Header from './Header';
import BookList from './BookList';
import {useBookRepository, useSettings} from '@/data';

import {openFileWithThirdPartyApp} from '@/shared/utils/files';

const LibraryScreen = () => {
  const {books} = useBookRepository();
  useSettings();
  return (
    <>
      <Header />
      <BookList
        data={books}
        onPressItem={async book => {
          if (book.filePath === '') {
            return;
          }
          await openFileWithThirdPartyApp(book.filePath);
        }}
      />
    </>
  );
};

export default LibraryScreen;
