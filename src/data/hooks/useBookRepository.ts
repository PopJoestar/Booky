import {useCallback} from 'react';
import {BookModel, bookModelToBook} from '../models/BookModel';
import {Book} from '@/interfaces/Book';
import {useQuery, useRealm} from '../database';

const useBookRepository = () => {
  const realm = useRealm();
  const books: Realm.Results<BookModel> = useQuery(BookModel);

  const addBook = useCallback(
    (book: Book) => {
      realm.write(() => {
        realm.create<BookModel>('Book', BookModel.generate(book));
      });

      return true;
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
      const response = realm.objectForPrimaryKey<BookModel>('Book', md5);

      if (response == null) {
        return null;
      }

      return bookModelToBook(response);
    },
    [realm],
  );

  return {addBook, removeBook, getBook, books: books.map(book => book)};
};

export default useBookRepository;
