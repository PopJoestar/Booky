import React from 'react';
import {useTranslation} from 'react-i18next';
import {useWindowDimensions} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Book} from '@/interfaces/Book';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import {RemoteBookItem, SearchBooksScreenHeader} from '@/components';
import {
  useAppTheme,
  useGetErrorMessage,
  useMessageDisplayer,
  useSearchBooksQuery,
} from '@/hooks';
import {Center, Box, Text, Button} from '@/core';
import ErrorHandler from '@/components/ErrorHandler';

const SearchBooksScreen = () => {
  const {height} = useWindowDimensions();
  const {t} = useTranslation('search');
  const {sizes} = useAppTheme();
  const getMessage = useGetErrorMessage();
  const {showMessage} = useMessageDisplayer();

  const {
    data,
    isNoResult,
    query,
    isFirstLoading,
    isLoading,
    isEnd,
    next,
    error,
    refetchCurrent,
    page,
  } = useSearchBooksQuery({
    onError: _error => {
      const {title, content} = getMessage(_error);
      showMessage({
        position: 'top',
        description: content,
        message: title ?? '',
      });
    },
  });

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

    if (error && data.length > 0) {
      return (
        <Center paddingVertical="m">
          <Button onPress={refetchCurrent} mode="contained">
            {t('reload')}
          </Button>
        </Center>
      );
    }

    return undefined;
  };

  const renderBook: ListRenderItem<Book> = ({item}) => {
    return <RemoteBookItem item={item} />;
  };

  const getError = () => {
    if (error === undefined) {
      return undefined;
    }

    return {
      value: error,
      actions: [
        {
          label: t('retry'),
          action: refetchCurrent,
        },
      ],
    };
  };

  const isFirstLoadError = page === 1 && !!error && data.length === 0;

  return (
    <>
      <SearchBooksScreenHeader />
      <ErrorHandler
        error={isFirstLoadError ? getError() : undefined}
        overlay={!isFirstLoadError}>
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
      </ErrorHandler>
    </>
  );
};

export default SearchBooksScreen;
