import {useQuery, useRealm} from '@/db';
import {BookRemote} from '@/features_libgen/types';
import {useCallback} from 'react';
import {BookModel} from '../../models/BookModel';

const useBookRepository = () => {
  const realm = useRealm();
  const books: Realm.Results<BookModel> = useQuery(BookModel);
  const addBook = useCallback(
    (book: BookRemote) => {
      let newBook!: BookModel;

      realm.write(() => {
        newBook = realm.create<BookModel>('Book', BookModel.generate(book));
      });

      return newBook;
    },
    [realm],
  );

  const removeBook = useCallback(
    (book: BookModel) => {
      realm.write(() => {
        realm.delete(book);
      });
    },
    [realm],
  );

  const getBook = useCallback(
    (md5: string) => {
      return realm.objectForPrimaryKey<BookModel>('Book', md5);
    },
    [realm],
  );

  return {addBook, removeBook, getBook, books: books.map(book => book)};
};

export default useBookRepository;
