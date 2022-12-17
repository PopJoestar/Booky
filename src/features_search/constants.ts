export const FILTERS_TYPES = ['category', 'language', 'extension'] as const;

export const CATEGORIES_OPTIONS_MAP = {
  all: 'common:all',
  fiction: 'search:categories.fiction',
  non_fiction: 'search:categories.non_fiction',
} as const;

export const CATEGORIES_OPTIONS = Object.keys(CATEGORIES_OPTIONS_MAP).map(
  opt => ({
    value: opt as CategoryOption,
    label: CATEGORIES_OPTIONS_MAP[opt as CategoryOption],
  }),
);

export const LANGUAGES_OPTIONS_MAP = {
  all: 'common:all',
  fr: 'search:languages.french',
  en: 'search:languages.english',
  de: 'search:languages.french',
  it: 'search:languages.italian',
} as const;

export const LANGUAGES_OPTIONS = Object.keys(LANGUAGES_OPTIONS_MAP).map(
  opt => ({
    value: opt as LanguageOption,
    label: LANGUAGES_OPTIONS_MAP[opt as LanguageOption],
  }),
);

export const EXTENSION_OPTIONS_MAP = {
  all: 'common:all',
  pdf: 'search:extensions.pdf',
  epub: 'search:extensions.epub',
  djvu: 'search:extensions.djvu',
} as const;

export const EXTENSION_OPTIONS = Object.keys(EXTENSION_OPTIONS_MAP).map(
  opt => ({
    value: opt as ExtensionOption,
    label: EXTENSION_OPTIONS_MAP[opt as ExtensionOption],
  }),
);

export type FilterType = typeof FILTERS_TYPES[number];
export type CategoryOption = keyof typeof CATEGORIES_OPTIONS_MAP;
export type LanguageOption = keyof typeof LANGUAGES_OPTIONS_MAP;
export type ExtensionOption = keyof typeof EXTENSION_OPTIONS_MAP;
