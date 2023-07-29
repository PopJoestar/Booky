import {useCallback} from 'react';
import {BookModel} from '../models/BookModel';
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

      return response;
    },
    [realm],
  );

  const updateBook = useCallback(
    (bookMd5: string, newBook: Partial<Book>) => {
      const book = getBook(bookMd5);

      if (book == null) {
        return;
      }

      realm.write(() => {
        for (const key in newBook) {
          //@ts-ignore
          book[key] = newBook[key];
        }
      });
    },
    [getBook, realm],
  );

  return {
    addBook,
    removeBook,
    getBook,
    updateBook,
    books: books.map(book => book),
  };
};

export default useBookRepository;
