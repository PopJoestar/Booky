import {useQuery, useRealm} from '@/db';
import {BookRemote} from '@/features_libgen/types';
import {useCallback} from 'react';
import {BookModel} from '../models/Book';

const useBookRepository = () => {
  const realm = useRealm();
  const books: Realm.Results<BookModel> = useQuery(BookModel);
  const addBook = useCallback(
    (book: BookRemote) => {
      realm.write(() => {
        realm.create('Book', BookModel.generate(book));
      });
    },
    [realm],
  );
  return {addBook, books: books.map(book => book)};
};

export default useBookRepository;
