import {create} from 'zustand';
import {CategoryOption, LanguageOption, ExtensionOption} from '../constants';

type SearchBooksOptionsStore = {
  category: CategoryOption;
  language: LanguageOption;
  extension: ExtensionOption;
  query: string;
  updateCategory: (value: CategoryOption) => void;
  updateLanguage: (value: LanguageOption) => void;
  updateExtension: (value: ExtensionOption) => void;
  updateQuery: (value: string) => void;
};

const useSearchBooksOptionsStore = create<SearchBooksOptionsStore>()(set => ({
  category: 'NON_FICTION',
  language: 'ALL',
  extension: 'ALL',
  query: '',
  updateCategory: value => set(state => ({...state, category: value})),
  updateExtension: value => set(state => ({...state, extension: value})),
  updateLanguage: value => set(state => ({...state, language: value})),
  updateQuery: value => set(state => ({...state, query: value})),
}));

export {useSearchBooksOptionsStore};
