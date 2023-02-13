import React from 'react';
import Header from './Header';
import BookList from './BookList';
import useBookRepository from '../hooks/useBookRepository';

const LibraryScreen = () => {
  const {books} = useBookRepository();

  return (
    <>
      <Header />
      <BookList data={books} />
    </>
  );
};

export default LibraryScreen;
