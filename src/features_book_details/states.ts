import create from 'zustand';
import {BookRemote, GetDetailsResponse} from '../features_libgen/types';

type useCurrentBookStore = {
  currentBook: BookRemote;
  setCurrentBook: (value: BookRemote) => void;
  setDetails: (value: GetDetailsResponse) => void;
  clear: () => void;
};

const initialCurrentBook: BookRemote = {
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
  type: 'NON_FICTION',
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
        type: value.type,
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
