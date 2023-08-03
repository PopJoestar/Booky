import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  NativeSyntheticEvent,
  StatusBar,
  TextInputSubmitEditingEventData,
} from 'react-native';

import Filters from './SearchBooksFilters';
import {useSearchBooksOptionsStore} from '../stores/searchBooksOptionsStore';
import {useAppTheme} from '@/hooks';
import {Searchbar} from '@/core';

const SearchBooksScreenHeader = () => {
  const {colors, textVariants} = useAppTheme();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [searchInput, setSearchInput] = useState<string>('');
  const updateQuery = useSearchBooksOptionsStore(state => state.updateQuery);
  const query = useSearchBooksOptionsStore(state => state.query);

  const submit = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    updateQuery(e.nativeEvent.text);
  };

  const handleOnChangeText = (text: string) => {
    if (query !== '' && text === '') {
      updateQuery('');
    }

    setSearchInput(text);
  };

  return (
    <>
      <StatusBar backgroundColor={colors.surface} />
      <Searchbar
        value={searchInput}
        onChangeText={handleOnChangeText}
        marginTop="searchbarHeader"
        marginHorizontal={'m'}
        elevation={0}
        inputStyle={textVariants.bodyLarge}
        icon="keyboard-backspace"
        onIconPress={navigation.goBack}
        backgroundColor="surfaceVariant"
        iconColor={colors.onSurface}
        placeholder={t('common:search')}
        onSubmitEditing={submit}
      />
      <Filters marginVertical={'m'} />
    </>
  );
};

export default SearchBooksScreenHeader;
