import {BookRemote} from '@/features_libgen/types';
import {useCallback} from 'react';
import {Book, useBooks, useBooksRealm} from '../models/Book';

const useBookRepository = () => {
  const realm = useBooksRealm();
  const books: Realm.Results<Book> = useBooks(Book);
  const addBook = useCallback(
    (book: BookRemote) => {
      realm.write(() => {
        realm.create('Book', Book.generate(book));
      });
    },
    [realm],
  );
  return {addBook, books};
};

export default useBookRepository;
