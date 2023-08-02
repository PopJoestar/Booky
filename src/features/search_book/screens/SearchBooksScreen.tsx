import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, useWindowDimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import BookList from '../../../features_library/components/BookList';
import {Book} from '@/interfaces/Book';
import SearchBooksScreenHeader from '../components/SearchBooksScreenHeader';
import useSearchBooksQuery from '../hooks/useSearchBooksQuery';
import {useTempBookStore} from '../stores/tempBookStore';
import {Box, Center, Text} from '@/shared/components';

const SearchBooksScreen = () => {
  const {height} = useWindowDimensions();
  const {t} = useTranslation('search');
  const navigation = useNavigation();

  const {data, isNoResult, query, isFirstLoading, isLoading, isEnd, next} =
    useSearchBooksQuery();

  const setTempBook = useTempBookStore(state => state.setTempBook);

  const goToBookDownloadScreen = useCallback(
    (item: Book) => {
      if (item.details_url === undefined) {
        Alert.alert('Scraping error', 'Undefined md5');
        return;
      }

      setTempBook(item);
      navigation.navigate('remote_book_details', {
        details_url: item.details_url,
      });
    },
    [navigation, setTempBook],
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

    if (isFirstLoading || isLoading) {
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
      <SearchBooksScreenHeader />
      <BookList
        data={data}
        showSaved={true}
        ListEmptyComponent={renderListEmptyComponent()}
        ListFooterComponent={renderListFooter()}
        onEndReached={next}
        onPressItem={goToBookDownloadScreen}
      />
    </>
  );
};

export default SearchBooksScreen;
