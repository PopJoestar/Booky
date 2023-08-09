const CATEGORIES_OPTIONS = [
  {
    value: 'FICTION',
    title: 'search:categories.fiction',
    description: 'search:categories.fiction_description',
  },
  {
    value: 'NON_FICTION',
    title: 'search:categories.non_fiction',
    description: 'search:categories.non_fiction_description',
  },
] as const;

const LANGUAGES_OPTIONS = [
  {
    value: 'ALL',
    title: 'common:all',
  },
  {
    value: 'fr',
    title: 'search:languages.french',
  },
  {
    value: 'en',
    title: 'search:languages.english',
  },
  {
    value: 'de',
    title: 'search:languages.german',
  },
  {
    value: 'it',
    title: 'search:languages.italian',
  },
] as const;

const EXTENSION_OPTIONS = [
  {
    value: 'ALL',
    title: 'common:all',
  },
  {
    value: 'pdf',
    title: 'search:extensions.pdf',
  },
  {
    value: 'epub',
    title: 'search:extensions.epub',
  },
  {
    value: 'djvu',
    title: 'search:extensions.djvu',
  },
] as const;

export const SEARCH_OPTIONS = {
  category: CATEGORIES_OPTIONS,
  language: LANGUAGES_OPTIONS,
  extension: EXTENSION_OPTIONS,
} as const;
