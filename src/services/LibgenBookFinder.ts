import {
  Book,
  BookCategory,
  BookExtension,
  BookFinder,
  BookLanguage,
} from '@/interfaces/Book';
import {Libgen, LibgenBook} from 'libgen';

class LibgenBookFinder implements BookFinder {
  async search(searchArgs: {
    query: string;
    category: BookCategory;
    language: BookLanguage;
    extension: BookExtension;
    page: number;
  }): Promise<{totalItem: number; totalPages: number; items: Book[]}> {
    const resp = await Libgen.search(searchArgs);
    return {
      totalItem: resp.totalItem,
      totalPages: resp.totalPages,
      items: resp.items.map(this.libgenBookToBook),
    };
  }
  getBookDetails(bookDetailUrl: string): Promise<Partial<Book>> {
    return Libgen.getDetails(bookDetailUrl);
  }

  private libgenBookToBook(libgenBook: LibgenBook): Book {
    return {
      ...libgenBook,
      filePath: '',
    };
  }
}

const bookFinder: BookFinder = new LibgenBookFinder();

export default bookFinder;
