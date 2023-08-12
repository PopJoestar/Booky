import {create} from 'zustand';

type SearchBooksOptionsStore = {
  category: number;
  language: number;
  extension: number;
  query: string;
  updateCategory: (value: number) => void;
  updateLanguage: (value: number) => void;
  updateExtension: (value: number) => void;
  updateQuery: (value: string) => void;
};

const useSearchBooksOptionsStore = create<SearchBooksOptionsStore>()(set => ({
  category: 1,
  language: 0,
  extension: 0,
  query: '',
  updateCategory: value => set(state => ({...state, category: value})),
  updateExtension: value => set(state => ({...state, extension: value})),
  updateLanguage: value => set(state => ({...state, language: value})),
  updateQuery: value => set(state => ({...state, query: value})),
}));

export {useSearchBooksOptionsStore};
