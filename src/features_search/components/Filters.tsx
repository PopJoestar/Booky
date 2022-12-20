import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BoxProps} from '@shopify/restyle';
import React, {useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '../../shared/components';
import Picker from '../../shared/components/molecules/Picker';
import {useAppTheme} from '../../shared/hooks';
import {Theme} from '../../theme';
import {
  CATEGORIES_OPTIONS_MAP,
  EXTENSION_OPTIONS_MAP,
  FILTERS_TYPES,
  LANGUAGES_OPTIONS_MAP,
  FilterType,
  LANGUAGES_OPTIONS,
  CATEGORIES_OPTIONS,
  EXTENSION_OPTIONS,
} from '../constants';
import {useFiltersStore} from '../states';
import FilterItem from './FilterItem';

const Filters = (props: BoxProps<Theme>) => {
  const {t} = useTranslation();
  const {sizes} = useAppTheme();
  const languageOptionsHandle = useRef<BottomSheetModalMethods>(null);
  const categoryOptionsHandle = useRef<BottomSheetModalMethods>(null);
  const extensionOptionHandle = useRef<BottomSheetModalMethods>(null);
  const filters = useFiltersStore();

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
    return (
      <FilterItem
        data={filterType}
        onPress={toggleBottomSheet}
        key={index}
        value={mapFiltersValueLabel(filterType)}
      />
    );
  };

  const mapFiltersValueLabel = (filterType: FilterType) => {
    switch (filterType) {
      case 'language':
        if (filters.language === 'all') {
          return t('search:languages.all');
        }
        return t(LANGUAGES_OPTIONS_MAP[filters.language]);
      case 'extension':
        if (filters.extension === 'all') {
          return t('search:extensions.all');
        }

        return t(EXTENSION_OPTIONS_MAP[filters.extension]);
      case 'category':
        if (filters.category === 'all') {
          return t('search:categories.all');
        }

        return t(CATEGORIES_OPTIONS_MAP[filters.category]);
    }
  };

  const selectExtension = (item: typeof EXTENSION_OPTIONS[number]) => {
    filters.updateExtension(item.value);
    extensionOptionHandle.current?.dismiss();
  };

  const selectLanguage = (item: typeof LANGUAGES_OPTIONS[number]) => {
    filters.updateLanguage(item.value);
    languageOptionsHandle.current?.dismiss();
  };

  const selectCategory = (item: typeof CATEGORIES_OPTIONS[number]) => {
    filters.updateCategory(item.value);
    categoryOptionsHandle.current?.dismiss();
  };

  return (
    <>
      <Box {...props} flexDirection={'row'} marginStart="m">
        {FILTERS_TYPES.map(renderFilter)}
      </Box>
      <Picker
        ref={languageOptionsHandle}
        options={LANGUAGES_OPTIONS}
        titleExtractor={item => t(item.label)}
        keyExtractor={(_, index) => index.toString()}
        itemHeight={sizes.listItem_one_line}
        selected={{
          value: filters.language,
          label: LANGUAGES_OPTIONS_MAP[filters.language],
        }}
        onPick={selectLanguage}
      />
      <Picker
        ref={categoryOptionsHandle}
        options={CATEGORIES_OPTIONS}
        titleExtractor={item => t(item.label)}
        keyExtractor={(_, index) => index.toString()}
        itemHeight={sizes.listItem_one_line}
        selected={{
          value: filters.category,
          label: CATEGORIES_OPTIONS_MAP[filters.category],
        }}
        onPick={selectCategory}
      />
      <Picker
        ref={extensionOptionHandle}
        options={EXTENSION_OPTIONS}
        titleExtractor={item => t(item.label)}
        keyExtractor={(_, index) => index.toString()}
        itemHeight={sizes.listItem_one_line}
        onPick={selectExtension}
        selected={{
          value: filters.extension,
          label: EXTENSION_OPTIONS_MAP[filters.extension],
        }}
      />
    </>
  );
};

export default Filters;