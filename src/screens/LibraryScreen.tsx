import React from 'react';
import {useBookRepository, useSettings} from '@/data';

import {BookList, LibraryScreenHeader} from '@/components';

const LibraryScreen = () => {
  const {books} = useBookRepository();
  useSettings();

  return (
    <>
      <LibraryScreenHeader />
      <BookList data={books} />
    </>
  );
};

export default LibraryScreen;
