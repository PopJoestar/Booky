import React from 'react';
import Header from './Header';
import BookList from './BookList';

const LibraryScreen = () => {
  return (
    <>
      <Header />
      <BookList data={[]} />
    </>
  );
};

export default LibraryScreen;
