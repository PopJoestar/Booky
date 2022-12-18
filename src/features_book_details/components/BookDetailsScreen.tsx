import React, {useEffect, useMemo} from 'react';
import {
  Box,
  Row,
  Image,
  Text,
  RenderHTML,
  ScrollView,
  Button,
} from '../../shared/components';
import {useAppTheme} from '../../shared/hooks';
import {useCurrentBookStore} from '../states';
import fakeData from '../data.json';
import {List} from 'react-native-paper';
import {StringUtils} from '../../shared/utils';
import {useTranslation} from 'react-i18next';

const BookDetailsScreen = () => {
  const currentBook = useCurrentBookStore(state => state.currentBook);
  const setDownloadLinksAndDescription = useCurrentBookStore(
    state => state.setDownloadLinksAndDescription,
  );

  const {sizes} = useAppTheme();
  const {t} = useTranslation();

  useEffect(() => {
    setDownloadLinksAndDescription({
      description: fakeData.description,
      downloadLinks: fakeData.downloadLinks,
    });
  }, [setDownloadLinksAndDescription]);

  const description = useMemo(() => {
    return {html: `<p>${currentBook.description}</p>`};
  }, [currentBook.description]);

  return (
    <Box flex={1}>
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
          {currentBook.description ? <RenderHTML source={description} /> : null}
        </Box>
        <List.Item
          title={'Publisher et date de publication'}
          description={StringUtils.merge([
            currentBook.publisher,
            currentBook.year,
          ])}
        />
        <List.Item
          title={'Nombre de pages'}
          description={currentBook.nbrOfPages}
        />
        <List.Item title={'Isbn'} description={currentBook.isbns.join(', ')} />
        <List.Item
          title={'Fichier'}
          description={StringUtils.merge([
            currentBook.size,
            currentBook.extension,
          ])}
        />
        <List.Item title={'Language'} description={currentBook.language} />
        {StringUtils.notEmpty(currentBook.series) ? (
          <List.Item title={'Series'} description={currentBook.series} />
        ) : null}
        <Box height={sizes.l} />
      </ScrollView>

      <Row
        paddingVertical="s"
        paddingRight={'m'}
        justifyContent={'space-around'}
        alignSelf="flex-end">
        <Button mode="outlined" marginRight="m">
          {t('common:save')}
        </Button>
        <Button mode="contained">{t('common:download')}</Button>
      </Row>
    </Box>
  );
};

export default BookDetailsScreen;
