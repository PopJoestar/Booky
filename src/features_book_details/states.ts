import create from 'zustand';
import {BookRemote} from '../features_libgen/types';

type useCurrentBookStore = {
  currentBook: BookRemote;
  setCurrentBook: (value: BookRemote) => void;
  setDownloadLinksAndDescription: (
    value: Pick<BookRemote, 'description' | 'downloadLinks'>,
  ) => void;
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
  setDownloadLinksAndDescription: value =>
    set(state => ({
      ...state,
      currentBook: {
        ...state.currentBook,
        description: value.description,
        downloadLinks: value.downloadLinks,
      },
    })),
  clear: () => set(state => ({...state, currentBook: initialCurrentBook})),
}));

export {useCurrentBookStore};
