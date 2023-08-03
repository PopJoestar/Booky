import {Book} from '@/interfaces/Book';
import {LibgenBook} from 'libgen';

export function libgenBookToBook(libgenBook: LibgenBook): Book {
  return {
    ...libgenBook,
    filePath: '',
  };
}
