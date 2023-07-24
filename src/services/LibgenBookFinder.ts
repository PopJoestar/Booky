import {
  Book,
  BookCategory,
  BookExtension,
  BookFinder,
  BookLanguage,
} from '@/interfaces/Book';
import {Libgen} from 'libgen';

class LibgenBookFinder implements BookFinder {
  search(searchArgs: {
    query: string;
    category: BookCategory;
    language: BookLanguage;
    extension: BookExtension;
    page: number;
  }): Promise<{totalItem: number; totalPages: number; items: Book[]}> {
    return Libgen.search(searchArgs);
  }
  getBookDetails(bookDetailUrl: string): Promise<Partial<Book>> {
    return Libgen.getDetails(bookDetailUrl);
  }
}

const bookFinder: BookFinder = new LibgenBookFinder();

export default bookFinder;
