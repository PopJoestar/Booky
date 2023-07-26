import {create} from 'zustand';
import {Book} from '@/interfaces/Book';

/**
 * Used to store the selected book from search screen temporary
 */

type TempBookStore = {
  tempBook: Book;
  setTempBook: (value: Book) => void;
  setDetails: (value: Partial<Book>) => void;
  clear: () => void;
};

const initialTempBook: Book = {
  libgenID: '',
  title: '',
  size: '',
  extension: '',
  md5: '',
  image: '',
  nbrOfPages: '',
  series: '',
  authors: [],
  publisher: '',
  isbns: undefined,
  year: '',
  language: '',
  filePath: '',
};

const useTempBookStore = create<TempBookStore>()(set => ({
  tempBook: initialTempBook,
  setTempBook: value =>
    set(state => ({
      ...state,
      tempBook: {
        ...state.tempBook,
        libgenID: value.libgenID,
        title: value.title,
        size: value.size,
        extension: value.extension,
        md5: value.md5,
        image: value.image,
        nbrOfPages: value.nbrOfPages,
        series: value.series,
        authors: value.authors,
        publisher: value.publisher,
        isbns: value.isbns,
        year: value.year,
        language: value.language,
        details_url: value.details_url,
      },
    })),
  setDetails: value =>
    set(state => ({
      ...state,
      tempBook: {
        ...state.tempBook,
        description: value.description,
        downloadLinks: value.downloadLinks,
        image: value.image ?? state.tempBook.image,
        year: value.year ?? state.tempBook.year,
        publisher: value.publisher ?? state.tempBook.publisher,
        isbns: value.isbns ?? state.tempBook.isbns,
      },
    })),
  clear: () => set(state => ({...state, tempBook: initialTempBook})),
}));

export {useTempBookStore};
