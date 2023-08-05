import {StatusBar} from 'react-native';

export const spacing = {
  none: 0,
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
  xs: 4,
  xxs: 2,
  bottomSheetHandleVertical: 11,
  bottomSheetLargeScreenMargin: 56,
  scaffoldBottom: 48,
  searchbarHeader: (StatusBar.currentHeight ?? 0) + 8,
};

export const sizes = {
  s: 8,
  m: 16,
  l: 24,
  xl: 40,
  xs: 4,
  xxs: 2,
  bottomSheetHandle: 32,
  chip: 32,
  listItem_one_line: 56,
  inputHeight: 56,
  radioButtonTarget: 40,
  buttonHeight: 40,
  searchbar: 50,
  tabIndicator: 3,
  book_card_image_height: 115,
  book_card_image_width: 80,
  book_poster_image_height: 165,
  book_poster_image_width: 120,
  book_card_estimated_height: 137,
  collection_item_width: 178,
  collection_item_height: 218,
  FAB: 100,
};

export const breakpoints = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  xxl: 1536,
};

export const borderRadii = {
  xs: 4,
  sm: 16,
  md: 24,
  lg: 64,
  hg: 128,
};
