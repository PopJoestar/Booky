import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, useWindowDimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useCurrentBookStore} from '../../features_book_details';
import {BookRemote} from '../../features_libgen/types';
import BookList from '../../features_library/components/BookList';
import {Box, Center, Text} from '../../shared/components';
import useSearch from '../hooks/useSearch';
import Header from './Header';

const SearchScreen = () => {
  const {height} = useWindowDimensions();
  const {t} = useTranslation('search');
  const navigation = useNavigation();

  const {data, isNoResult, query, isFirstLoading, isLoading, isEnd, next} =
    useSearch();

  const setCurrentBook = useCurrentBookStore(state => state.setCurrentBook);

  const goToBookDownloadScreen = useCallback(
    (item: BookRemote) => {
      if (item.details_url === undefined) {
        Alert.alert('Scraping error', 'Undefined md5');
        return;
      }

      setCurrentBook(item);
      navigation.navigate('book_details', {
        details_url: item.details_url,
      });
    },
    [navigation, setCurrentBook],
  );

  const renderListEmptyComponent = () => {
    if (isNoResult) {
      return (
        <Center flex={1} height={height - 100}>
          <Text variant={'bodyLarge'}>
            {t('no_result_found_for', {query})}{' '}
          </Text>
        </Center>
      );
    }

    if (isFirstLoading) {
      return (
        <Center flex={1} height={height - 100}>
          <ActivityIndicator />
        </Center>
      );
    }

    return undefined;
  };

  const renderListFooter = () => {
    if (!isFirstLoading && isLoading) {
      return (
        <Center paddingVertical="m">
          <ActivityIndicator />
        </Center>
      );
    }

    if (isEnd) {
      return (
        <Box paddingVertical="m">
          <Text textAlign={'center'} variant="bodyLarge">
            Fin des résultats
          </Text>
        </Box>
      );
    }

    return undefined;
  };

  return (
    <>
      <Header />
      <BookList
        data={data}
        ListEmptyComponent={renderListEmptyComponent()}
        ListFooterComponent={renderListFooter()}
        onEndReached={next}
        onPressItem={goToBookDownloadScreen}
      />
    </>
  );
};

export default SearchScreen;
