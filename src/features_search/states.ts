import create from 'zustand';
import {CategoryOption, ExtensionOption, LanguageOption} from './constants';

type FiltersStore = {
  category: CategoryOption;
  language: LanguageOption;
  extension: ExtensionOption;
  updateCategory: (value: CategoryOption) => void;
  updateLanguage: (value: LanguageOption) => void;
  updateExtension: (value: ExtensionOption) => void;
};

const useFiltersStore = create<FiltersStore>()(set => ({
  category: 'all',
  language: 'all',
  extension: 'all',
  updateCategory: value => set(state => ({...state, category: value})),
  updateExtension: value => set(state => ({...state, extension: value})),
  updateLanguage: value => set(state => ({...state, language: value})),
}));

export {useFiltersStore};
