import React, {useMemo, useRef, useState} from 'react';
import {
  Box,
  Row,
  Image,
  Text,
  RenderHTML,
  ScrollView,
  Button,
  AnimatedBox,
  Chip,
} from '@/shared/components';
import {List} from 'react-native-paper';
import {StringUtils} from '@/shared/utils';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import Animated, {
  FadeIn,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {useAppTheme} from '@/shared/hooks';

import {RemoteBookDetailsScreenRouteProp} from '@/navigation/types';
import {useTempBookStore} from '../stores/tempBookStore';

import useGetRemoteBookDetailsQuery from '../hooks/useGetRemoteBookDetailsQuery';
import {Constants} from '@/constants';

import {ScrollView as RNScrollView} from 'react-native';
import {BookService} from '@/services';
import {useDownloadBook} from '@/hooks';
import {
  useBookDownloadInfoObject,
  useBookObject,
  useBookRepository,
} from '@/data';
import {redirectToManageExternalStoragePermission} from '@/shared/utils/permissions';
import ExternalStorage from 'externalStorage';

const RemoteBookDetailsScreen = () => {
  const {sizes} = useAppTheme();
  const {t} = useTranslation();
  const {params} = useRoute<RemoteBookDetailsScreenRouteProp>();

  const currentBook = useTempBookStore(state => state.tempBook);
  const savedBook = useBookObject(currentBook.md5 ?? '');

  const setDetails = useTempBookStore(state => state.setDetails);
  const hostsListRef = useRef<RNScrollView>();
  const {addBook, getBook} = useBookRepository();

  const {downloadBook, cancelDownload} = useDownloadBook();
  const downloadInfo = useBookDownloadInfoObject(currentBook.md5 ?? '');

  const [selectedHostIndex, setSelectedHostIndex] = useState(-1);

  const {isLoading, error} = useGetRemoteBookDetailsQuery({
    bookDetailsUrl: params.details_url,
    onSuccess: data => {
      setDetails(data);
      if (data.downloadLinks) {
        const hostIndex = BookService.getDefaultDownloadHostIndex(
          data.downloadLinks.length,
        );
        setSelectedHostIndex(hostIndex);

        hostsListRef.current?.scrollTo({
          x: 50 * hostIndex,
          y: 0,
          animated: true,
        });
      }
    },
  });

  const description = useMemo(() => {
    return {html: `<p>${currentBook.description}</p>`};
  }, [currentBook.description]);

  const handleOnPressDownload = async () => {
    let isExternalStorageManager =
      await ExternalStorage.isExternalStorageManager();

    if (!isExternalStorageManager) {
      await redirectToManageExternalStoragePermission();

      isExternalStorageManager =
        await ExternalStorage.isExternalStorageManager();
      if (!isExternalStorageManager) {
        return;
      }
    }

    const _savedBook = getBook(currentBook.md5!);

    if (_savedBook == null) {
      addBook(currentBook);
    }

    downloadBook(currentBook, selectedHostIndex);
  };

  const openBook = () => {
    if (savedBook == null) {
      return;
    }
    BookService.openBook(savedBook);
  };

  const style = useAnimatedStyle(
    () => ({
      opacity: withTiming(isLoading ? 0.4 : 1),
    }),
    [isLoading],
  );

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

        <Box>
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
        </Box>

        <Box height={sizes.l} />
      </ScrollView>

      <Box paddingHorizontal={'m'} paddingVertical="s" rowGap={'s'}>
        <Row alignItems={'center'} columnGap={'m'}>
          <Text variant={'labelLarge'}>{t('book_details:gateways')}</Text>
          <Box flex={1}>
            <ScrollView
              horizontal
              ref={hostsListRef}
              showsHorizontalScrollIndicator={false}
              marginRight={'s'}>
              {currentBook.downloadLinks
                ?.filter(({host}) =>
                  Constants.VALID_HOSTS.includes(host.trim().toLowerCase()),
                )
                .map((downloadLink, index) => (
                  <Chip
                    marginLeft={'s'}
                    key={index}
                    onPress={() => setSelectedHostIndex(index)}
                    mode={selectedHostIndex === index ? 'flat' : 'outlined'}
                    icon={
                      selectedHostIndex === index
                        ? 'checkbox-marked-circle'
                        : undefined
                    }
                    selected={selectedHostIndex === index}>
                    {downloadLink.host}
                  </Chip>
                ))}
              <Box width={40} />
            </ScrollView>
          </Box>
        </Row>

        <Row justifyContent={'flex-end'} columnGap={'s'}>
          {savedBook && savedBook.filePath !== '' ? (
            <Button mode="outlined" onPress={openBook}>
              {t('common:open')}
            </Button>
          ) : null}
          <Button onPress={() => cancelDownload(currentBook.md5!)}>
            Cancel
          </Button>
          {/* {!!downloadInfo ? :null} */}
          <Button
            mode="contained"
            loading={!!downloadInfo}
            disabled={
              isLoading ||
              !!error ||
              currentBook.downloadLinks == null ||
              currentBook.downloadLinks.length === 0 ||
              !!downloadInfo
            }
            onPress={handleOnPressDownload}>
            {t('common:download')}
          </Button>
        </Row>
      </Box>
    </AnimatedBox>
  );
};

export default RemoteBookDetailsScreen;
