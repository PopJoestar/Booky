import React, {useRef} from 'react';

import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BoxProps} from '@shopify/restyle';
import {useTranslation} from 'react-i18next';

import {Box, Chip, Picker} from '@/core';

import {Theme} from '@/theme';
import {useAppTheme} from '@/hooks';
import {FilterType} from '@/types/searchOption';
import {SEARCH_OPTIONS} from '@/constants/searchOptions';
import {useSearchBooksOptionsStore} from '@/stores';

const SearchBooksFilters = (props: BoxProps<Theme>) => {
  const {t} = useTranslation();
  const {sizes} = useAppTheme();
  const languageOptionsHandle = useRef<BottomSheetModalMethods>(null);
  const categoryOptionsHandle = useRef<BottomSheetModalMethods>(null);
  const extensionOptionHandle = useRef<BottomSheetModalMethods>(null);
  const filters = useSearchBooksOptionsStore();

  const toggleBottomSheet = (filterType: FilterType) => {
    switch (filterType) {
      case 'language':
        languageOptionsHandle.current?.present();
        return;
      case 'category':
        categoryOptionsHandle.current?.present();
        return;
      case 'extension':
        extensionOptionHandle.current?.present();
        return;
    }
  };

  const renderFilter = (filterType: FilterType, index: number) => {
    if (filters.category === 1 && filterType === 'extension') {
      return;
    }

    const filterValue = filters[filterType];

    return (
      <FilterItem
        value={filterType}
        onPress={toggleBottomSheet}
        key={index}
        label={t(SEARCH_OPTIONS[filterType][filterValue].title)}
      />
    );
  };

  const selectExtension = (selectedExtensionOptionIndex: number) => {
    filters.updateExtension(selectedExtensionOptionIndex);
    extensionOptionHandle.current?.dismiss();
  };

  const selectLanguage = (selectedLanguageOptionIndex: number) => {
    filters.updateLanguage(selectedLanguageOptionIndex);
    languageOptionsHandle.current?.dismiss();
  };

  const selectCategory = (selectedCategoryOptionIndex: number) => {
    filters.updateCategory(selectedCategoryOptionIndex);
    categoryOptionsHandle.current?.dismiss();
  };

  const isFictionCategorySelected = filters.category === 0;

  return (
    <>
      <Box {...props} flexDirection={'row'} marginStart="m">
        {/* @ts-ignore */}
        {Object.keys(SEARCH_OPTIONS).map(renderFilter)}
      </Box>
      <Picker
        ref={languageOptionsHandle}
        options={SEARCH_OPTIONS.language.map(option => ({
          title: t(option.title),
        }))}
        selectedIndex={filters.language}
        itemHeight={sizes.listItem_one_line}
        onPick={selectLanguage}
      />
      <Picker
        ref={categoryOptionsHandle}
        options={SEARCH_OPTIONS.category.map(option => ({
          title: t(option.title),
          description: t(option.description),
        }))}
        itemHeight={sizes.listItem_one_line + 20}
        selectedIndex={filters.category}
        onPick={selectCategory}
      />
      {isFictionCategorySelected ? (
        <Picker
          ref={extensionOptionHandle}
          options={SEARCH_OPTIONS.extension.map(option => ({
            title: t(option.title),
          }))}
          itemHeight={sizes.listItem_one_line}
          onPick={selectExtension}
          selectedIndex={filters.extension}
        />
      ) : null}
    </>
  );
};

// Filter item
type Props = {
  value: FilterType;
  onPress?: (item: FilterType) => void;
  label: string;
};

const FilterItem = ({value, onPress, label}: Props) => {
  const {sizes} = useAppTheme();

  const _onPress = () => {
    if (onPress === undefined) {
      return;
    }

    onPress(value);
  };

  return (
    <Chip
      mode="outlined"
      closeIcon="menu-down"
      height={sizes.chip}
      marginRight="s"
      onPress={_onPress}
      onClose={_onPress}>
      {label}
    </Chip>
  );
};

export default SearchBooksFilters;
