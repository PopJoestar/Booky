import React, {useMemo} from 'react';
import {
  Box,
  Row,
  Image,
  Text,
  RenderHTML,
  ScrollView,
  Button,
  AnimatedBox,
} from '@/shared/components';
import {useCurrentBookStore} from '../states';
import {List} from 'react-native-paper';
import {StringUtils} from '@/shared/utils';
import {useTranslation} from 'react-i18next';
import useSWR from 'swr';
import {useRoute} from '@react-navigation/native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {useAppTheme, useSnackbar} from '@/shared/hooks';
import {useBookRepository} from '@/features_library';
import {BookDetailsScreenRouteProp} from '@/navigation/types';
import {Libgen} from '@/features_libgen';

const BookDetailsScreen = () => {
  const {sizes} = useAppTheme();
  const {t} = useTranslation();
  const showSnackbar = useSnackbar();
  const {params} = useRoute<BookDetailsScreenRouteProp>();
  const {addBook, getBook} = useBookRepository();

  const currentBook = useCurrentBookStore(state => state.currentBook);
  const setDetails = useCurrentBookStore(state => state.setDetails);

  const {isLoading, error} = useSWR(
    params.details_url,
    (detailsUrl: string) => Libgen.getDetails(detailsUrl),
    {
      onSuccess: data => {
        setDetails(data);
      },
    },
  );

  const description = useMemo(() => {
    return {html: `<p>${currentBook.description}</p>`};
  }, [currentBook.description]);

  const style = useAnimatedStyle(() => ({
    opacity: withTiming(isLoading ? 0.4 : 1),
  }));

  const saveBook = () => {
    addBook(currentBook);
    showSnackbar({
      message: t('book_details:book_saved', {title: currentBook.title}),
      duration: 1000,
    });
  };

  const isBookInLibrary = () => {
    if (currentBook.md5 == null) {
      return false;
    }
    return getBook(currentBook.md5) != null;
  };

  return (
    <AnimatedBox flex={1} style={style}>
      <ScrollView paddingTop="l" showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="m">
          <Row>
            <Image
              source={{uri: currentBook.image}}
              height={sizes.book_poster_image_height}
              width={sizes.book_poster_image_width}
            />
            <Box flex={1} marginHorizontal="m">
              <Text variant="titleLarge">{currentBook.title}</Text>
              <Text
                variant="labelMedium"
                marginTop="s"
                color="onSurfaceVariant">
                {currentBook.authors.join(', ')}
              </Text>
            </Box>
          </Row>
          {currentBook.description ? (
            <Animated.View entering={FadeIn}>
              <RenderHTML source={description} />
            </Animated.View>
          ) : null}
        </Box>
        <List.Item
          title={t('book_details:book_info_label.publisher_publication_date')}
          description={
            currentBook.publisher || currentBook.year
              ? StringUtils.merge([currentBook.publisher, currentBook.year])
              : t('unkown')
          }
        />
        <List.Item
          title={t('book_details:book_info_label.nbr_page')}
          description={
            currentBook.nbrOfPages ? currentBook.nbrOfPages : t('unkown')
          }
        />
        <List.Item
          title={t('book_details:book_info_label.isbn')}
          description={
            currentBook.isbns && currentBook.isbns.length > 0
              ? currentBook.isbns.join(', ')
              : t('unkown')
          }
        />
        <List.Item
          title={t('book_details:book_info_label.file')}
          description={StringUtils.merge([
            currentBook.size,
            currentBook.extension,
          ])}
        />
        <List.Item
          title={t('book_details:book_info_label.language')}
          description={currentBook.language}
        />
        {StringUtils.notEmpty(currentBook.series) ? (
          <List.Item
            title={t('book_details:book_info_label.series')}
            description={currentBook.series}
          />
        ) : null}
        <Box height={sizes.l} />
      </ScrollView>

      <Row
        paddingVertical="s"
        paddingRight={'m'}
        justifyContent={'space-around'}
        alignSelf="flex-end">
        <Button
          mode="outlined"
          marginRight="m"
          disabled={isLoading || !!error || isBookInLibrary()}
          icon={isBookInLibrary() ? 'check' : undefined}
          onPress={saveBook}>
          {isBookInLibrary() ? t('label:saved') : t('common:save')}
        </Button>
        <Button mode="contained" disabled={isLoading || !!error}>
          {t('common:download')}
        </Button>
      </Row>
    </AnimatedBox>
  );
};

export default BookDetailsScreen;
