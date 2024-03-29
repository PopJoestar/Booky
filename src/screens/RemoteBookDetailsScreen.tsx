import React, {useMemo, useRef, useState} from 'react';

import {List, Portal, ProgressBar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useRoute} from '@react-navigation/native';
import {FadeIn, useAnimatedStyle, withTiming} from 'react-native-reanimated';

import {RemoteBookDetailsScreenRouteProp} from '@/navigation/types';

import {Constants, ErrorConstant} from '@/constants';

import {BookService} from '@/services';
import {
  useAppTheme,
  useDownloadBook,
  useGetRemoteBookDetailsQuery,
  useMessageDisplayer,
  useToggle,
} from '@/hooks';
import {
  useBookDownloadInfoObject,
  useBookObject,
  useBookRepository,
} from '@/hooks';
import {useTempBookStore} from '@/stores';
import {
  AnimatedBox,
  Box,
  Row,
  Text,
  ScrollView,
  Button,
  Image,
  Chip,
  RenderHTML,
} from '@/core';
import {ScrollView as RNScrollView} from 'react-native';
import {mergeStrings, notEmptyString} from '@/utils/strings';
import {requestExternalStoragePermission} from '@/utils/permissions';
import ErrorHandler from '@/components/ErrorHandler';
import {BaseError} from '@/types/errors';
import {StorageAccessSnackBar} from '@/components';

const RemoteBookDetailsScreen = () => {
  const {sizes, colors} = useAppTheme();
  const {t} = useTranslation();
  const {params} = useRoute<RemoteBookDetailsScreenRouteProp>();
  const [isStorageAccessSnackbarVisible, toggleIsStorageAccessSnackbarVisible] =
    useToggle();

  const currentBook = useTempBookStore(state => state.tempBook);
  const savedBook = useBookObject(currentBook.md5 ?? '');

  const setDetails = useTempBookStore(state => state.setDetails);
  const hostsListRef = useRef<RNScrollView>();
  const {addBook, getBook} = useBookRepository();

  const {showMessage} = useMessageDisplayer();

  const {downloadBook, cancelDownload} = useDownloadBook();
  const downloadInfo = useBookDownloadInfoObject(currentBook.md5!);

  const [selectedHostIndex, setSelectedHostIndex] = useState(-1);

  const {isLoading, error, refetch} = useGetRemoteBookDetailsQuery({
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

  const handleOnPressDownload = async () => {
    const isExternalStorageManager = await requestExternalStoragePermission();

    if (!isExternalStorageManager) {
      toggleIsStorageAccessSnackbarVisible();
      return;
    }

    const _savedBook = getBook(currentBook.md5!);

    if (_savedBook == null) {
      addBook(currentBook);
    }

    downloadBook(currentBook, selectedHostIndex);
  };

  const openBook = async () => {
    if (savedBook == null) {
      return;
    }
    try {
      await BookService.openBook(savedBook);
    } catch (err) {
      if (
        err instanceof BaseError &&
        err.code === ErrorConstant.NO_ACTIVITY_FOUND_TO_OPEN_FILE
      ) {
        showMessage({
          message: t('common:no_application_to_open_file', {
            file: `${savedBook.title}.${savedBook.extension.toLowerCase()}`,
          }),
          position: {bottom: 70},
        });
      }
    }
  };

  const style = useAnimatedStyle(
    () => ({
      opacity: withTiming(isLoading ? 0.4 : 1),
    }),
    [isLoading],
  );

  const description = useMemo(
    () => ({html: `<span>${currentBook.description}</span>`}),
    [currentBook.description],
  );

  return (
    <>
      <ErrorHandler
        error={
          error
            ? {
                value: error,
                actions: [
                  {
                    label: t('common:retry'),
                    action: refetch,
                  },
                ],
              }
            : undefined
        }
        overlay>
        <AnimatedBox flex={1} style={style}>
          <ScrollView paddingTop="l" showsVerticalScrollIndicator={false}>
            <Box paddingHorizontal="m" rowGap={'m'}>
              <Row>
                <Box
                  height={sizes.book_poster_image_height}
                  width={sizes.book_poster_image_width}>
                  {currentBook.image == null ? null : (
                    <Image source={{uri: currentBook.image}} flex={1} />
                  )}
                </Box>

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
                <AnimatedBox entering={FadeIn}>
                  <RenderHTML
                    defaultTextProps={{
                      selectable: true,
                      selectionColor: colors.primaryContainer,
                      style: {
                        color: colors.onSurface,
                      },
                    }}
                    source={description}
                  />
                </AnimatedBox>
              ) : null}
            </Box>

            <Box>
              <List.Item
                title={t(
                  'book_details:book_info_label.publisher_publication_date',
                )}
                description={
                  currentBook.publisher || currentBook.year
                    ? mergeStrings([currentBook.publisher, currentBook.year])
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
                description={mergeStrings([
                  currentBook.size,
                  currentBook.extension,
                ])}
              />
              <List.Item
                title={t('book_details:book_info_label.language')}
                description={currentBook.language}
              />
              {notEmptyString(currentBook.series) ? (
                <List.Item
                  title={t('book_details:book_info_label.series')}
                  description={currentBook.series}
                />
              ) : null}
            </Box>

            <Box height={sizes.l} />
          </ScrollView>

          <Box paddingHorizontal={'m'} paddingVertical="s" rowGap={'s'}>
            {downloadInfo ? null : (
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
                        Constants.VALID_HOSTS.includes(
                          host.trim().toLowerCase(),
                        ),
                      )
                      .map((downloadLink, index) => (
                        <Chip
                          marginLeft={'s'}
                          key={index}
                          onPress={() => setSelectedHostIndex(index)}
                          mode={
                            selectedHostIndex === index ? 'flat' : 'outlined'
                          }
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
            )}

            <Row
              justifyContent={'flex-end'}
              columnGap={'s'}
              alignItems={'center'}>
              {downloadInfo ? (
                <Box flex={1}>
                  <ProgressBar indeterminate />
                </Box>
              ) : null}

              {downloadInfo ? (
                <Button
                  marginLeft={'m'}
                  onPress={() => cancelDownload(currentBook.md5!)}
                  mode="contained-tonal"
                  textColor={colors.onError}
                  buttonColor={colors.error}>
                  {t('common:cancel_download')}
                </Button>
              ) : null}

              {savedBook && savedBook.filePath !== '' && !downloadInfo ? (
                <Button mode="outlined" onPress={openBook}>
                  {t('common:open')}
                </Button>
              ) : null}

              {downloadInfo ? null : (
                <Button
                  mode="contained"
                  loading={!!downloadInfo}
                  disabled={
                    isLoading ||
                    !!error ||
                    currentBook.downloadLinks == null ||
                    currentBook.downloadLinks.length === 0
                  }
                  onPress={handleOnPressDownload}>
                  {t('common:download')}
                </Button>
              )}
            </Row>
          </Box>
        </AnimatedBox>
      </ErrorHandler>
      <Portal>
        <StorageAccessSnackBar
          visible={isStorageAccessSnackbarVisible}
          onDismiss={toggleIsStorageAccessSnackbarVisible}
        />
      </Portal>
    </>
  );
};

export default RemoteBookDetailsScreen;
