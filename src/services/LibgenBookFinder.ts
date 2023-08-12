import {
  Book,
  BookCategory,
  BookExtension,
  BookFinder,
  BookLanguage,
} from '@/interfaces/Book';
import {HostError, HttpError} from '@/utils/errors';
import {Libgen, LibgenBook} from 'libgen';

class LibgenBookFinder implements BookFinder {
  async search(searchArgs: {
    query: string;
    category: BookCategory;
    language: BookLanguage;
    extension: BookExtension;
    page: number;
  }): Promise<{totalItem: number; totalPages: number; items: Book[]}> {
    try {
      const resp = await Libgen.search(searchArgs);
      return {
        totalItem: resp.totalItem,
        totalPages: resp.totalPages,
        items: resp.items.map(this.libgenBookToBook),
      };
    } catch (error) {
      throw this.transformError(error);
    }
  }
  async getBookDetails(bookDetailUrl: string): Promise<Partial<Book>> {
    try {
      const response = await Libgen.getDetails(bookDetailUrl);
      return response;
    } catch (error) {
      throw this.transformError(error);
    }
  }

  private transformError(error: unknown) {
    if (error instanceof Error) {
      if (error.message.includes('500')) {
        return new HostError(error.message, 'libgen', error.stack);
      }
      if (
        error.message.includes('Failed to connect') ||
        error.message.includes('Unable to resolve host')
      ) {
        return new HttpError('CONNECTION_ERROR', error.message, error.stack);
      }

      if (error.message.includes('timeout')) {
        return new HttpError('TIMEOUT_ERROR', error.message, error.stack);
      }
    }

    return error;
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
