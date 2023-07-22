import {create} from 'zustand';
import {CategoryOption, ExtensionOption, LanguageOption} from './constants';

type SearchStore = {
  category: CategoryOption;
  language: LanguageOption;
  extension: ExtensionOption;
  query: string;
  updateCategory: (value: CategoryOption) => void;
  updateLanguage: (value: LanguageOption) => void;
  updateExtension: (value: ExtensionOption) => void;
  updateQuery: (value: string) => void;
};

const useSearchStore = create<SearchStore>()(set => ({
  category: 'NON_FICTION',
  language: 'ALL',
  extension: 'ALL',
  query: '',
  updateCategory: value => set(state => ({...state, category: value})),
  updateExtension: value => set(state => ({...state, extension: value})),
  updateLanguage: value => set(state => ({...state, language: value})),
  updateQuery: value => set(state => ({...state, query: value})),
}));

export {useSearchStore};
