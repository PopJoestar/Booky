import {create} from 'zustand';
import {Book} from '@/interfaces/Book';

type useCurrentBookStore = {
  currentBook: Book;
  setCurrentBook: (value: Book) => void;
  setDetails: (value: Partial<Book>) => void;
  clear: () => void;
};

const initialCurrentBook: Book = {
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
};

const useCurrentBookStore = create<useCurrentBookStore>()(set => ({
  currentBook: initialCurrentBook,
  setCurrentBook: value =>
    set(state => ({
      ...state,
      currentBook: {
        ...state.currentBook,
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
      currentBook: {
        ...state.currentBook,
        description: value.description,
        downloadLinks: value.downloadLinks,
        image: value.image ?? state.currentBook.image,
        year: value.year ?? state.currentBook.year,
        publisher: value.publisher ?? state.currentBook.publisher,
        isbns: value.isbns ?? state.currentBook.isbns,
      },
    })),
  clear: () => set(state => ({...state, currentBook: initialCurrentBook})),
}));

export {useCurrentBookStore};
