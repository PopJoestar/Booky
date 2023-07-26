import React, {useRef} from 'react';

import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {BoxProps} from '@shopify/restyle';
import {useTranslation} from 'react-i18next';

import {Box, Chip, Picker} from '@/shared/components';
import {useSearchBooksOptionsStore} from '../stores/searchBooksOptionsStore';
import {
  FilterType,
  LANGUAGES_OPTIONS_MAP,
  EXTENSION_OPTIONS_MAP,
  CATEGORIES_OPTIONS_MAP,
  EXTENSION_OPTIONS,
  LANGUAGES_OPTIONS,
  CATEGORIES_OPTIONS,
  FILTERS_TYPES,
} from '../constants';
import {Theme} from '@/theme';
import {useAppTheme} from '@/shared/hooks';

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
    if (filters.category === 'NON_FICTION' && filterType === 'extension') {
      return;
    }

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
        if (filters.language === 'ALL') {
          return t('search:languages.all');
        }
        return t(LANGUAGES_OPTIONS_MAP[filters.language]);
      case 'extension':
        if (filters.extension === 'ALL') {
          return t('search:extensions.all');
        }

        return t(EXTENSION_OPTIONS_MAP[filters.extension]);
      case 'category':
        return t(CATEGORIES_OPTIONS_MAP[filters.category]);
    }
  };

  const selectExtension = (item: (typeof EXTENSION_OPTIONS)[number]) => {
    filters.updateExtension(item.value);
    extensionOptionHandle.current?.dismiss();
  };

  const selectLanguage = (item: (typeof LANGUAGES_OPTIONS)[number]) => {
    filters.updateLanguage(item.value);
    languageOptionsHandle.current?.dismiss();
  };

  const selectCategory = (item: (typeof CATEGORIES_OPTIONS)[number]) => {
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
      {filters.category === 'FICTION' ? (
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
      ) : null}
    </>
  );
};

// Filter item

type Props = {
  data: FilterType;
  onPress?: (item: FilterType) => void;
  value: string;
};

const FilterItem = ({data, onPress, value}: Props) => {
  const {sizes} = useAppTheme();

  const _onPress = () => {
    if (onPress === undefined) {
      return;
    }

    onPress(data);
  };

  return (
    <Chip
      mode="outlined"
      closeIcon="menu-down"
      height={sizes.chip}
      marginRight="s"
      onPress={_onPress}
      onClose={_onPress}>
      {value}
    </Chip>
  );
};

export default SearchBooksFilters;
