import React from 'react';
import {useTranslation} from 'react-i18next';
import {useWindowDimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Book} from '@/interfaces/Book';
import {Box, Center, Text} from '@/shared/components';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {useAppTheme} from '@/shared/hooks';
import {RemoteBookItem} from '@/components';
import {useSearchBooksQuery} from '@/hooks';

const SearchBooksScreen = () => {
  const {height} = useWindowDimensions();
  const {t} = useTranslation('search');
  const {sizes} = useAppTheme();

  const {data, isNoResult, query, isFirstLoading, isLoading, isEnd, next} =
    useSearchBooksQuery();

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

  const renderBook: ListRenderItem<Book> = ({item}) => {
    return <RemoteBookItem item={item} />;
  };

  return (
    <FlashList
      data={data}
      ListEmptyComponent={renderListEmptyComponent()}
      ListFooterComponent={renderListFooter()}
      onEndReached={next}
      estimatedItemSize={sizes.book_card_estimated_height}
      scrollEventThrottle={16}
      renderItem={renderBook}
      onEndReachedThreshold={1.5}
    />
  );
};

export default SearchBooksScreen;
