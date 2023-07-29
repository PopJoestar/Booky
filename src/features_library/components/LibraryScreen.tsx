import React from 'react';
import Header from './Header';
import BookList from './BookList';
import {useBookRepository, useSettings} from '@/data';

const LibraryScreen = () => {
  const {books} = useBookRepository();
  useSettings();
  return (
    <>
      <Header />
      <BookList data={books} />
    </>
  );
};

export default LibraryScreen;
