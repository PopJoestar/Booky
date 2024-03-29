import {useBookObject, useBookDownloadInfoObject} from '@/hooks';
import {useDownloadBook} from '@/hooks';
import {Row, Box, TouchableRipple, Image, Text, ProgressBar} from '@/core';
import {sizes} from '@/theme/layout';
import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton, Surface} from 'react-native-paper';

import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import BookStatusIcon from './BookStatusIcon';
import {Book} from '@/interfaces/Book';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTempBookStore} from '@/stores';
import {BookStatus} from '@/types/status';

type Props = {item: Book};

const RemoteBookItem = ({item}: Props) => {
  const {t} = useTranslation('common');
  const savedBook = useBookObject(item.md5 ?? '');
  const navigation = useNavigation();
  const setTempBook = useTempBookStore(state => state.setTempBook);

  const downloadInfo = useBookDownloadInfoObject(item.md5 ?? '');
  const {cancelDownload} = useDownloadBook();

  const goToBookDownloadScreen = useCallback(() => {
    if (item.details_url === undefined) {
      Alert.alert('Scraping error', 'Undefined md5');
      return;
    }

    setTempBook(item);
    navigation.navigate('remote_book_details', {
      details_url: item.details_url,
    });
  }, [item, navigation, setTempBook]);

  const getStatus = (): BookStatus | undefined => {
    if (downloadInfo != null) {
      return 'downloading';
    }

    if (savedBook == null) {
      return undefined;
    }

    if (savedBook.filePath !== '') {
      return 'downloaded';
    }

    return 'saved';
  };

  const callCancelDownload = () => {
    cancelDownload(item.md5!);
  };

  const status = getStatus();

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableRipple
        backgroundColor="surface"
        paddingLeft="m"
        paddingVertical="m"
        onPress={goToBookDownloadScreen}
        paddingRight="l">
        <Row>
          <Surface
            elevation={2}
            style={{
              height: sizes.book_card_image_height,
              width: sizes.book_card_image_width,
            }}>
            {item.image ? (
              <Image
                source={{uri: item.image}}
                height={sizes.book_card_image_height}
                width={sizes.book_card_image_width}
              />
            ) : null}
          </Surface>

          <Box flex={1} paddingLeft="m">
            <Box flex={1}>
              <Row alignItems={'center'}>
                <Box flex={1}>
                  <Text variant="bodyLarge" color="onSurface" numberOfLines={2}>
                    {item.title}
                  </Text>
                </Box>

                <BookStatusIcon status={status} alignSelf="flex-start" />
              </Row>

              <Text
                variant="bodySmall"
                color="onSurfaceVariant"
                numberOfLines={1}>
                {item.authors.length > 0
                  ? item.authors.join(', ')
                  : t('unkown_author')}
              </Text>
              <Text
                variant="bodySmall"
                color="onSurface"
                numberOfLines={1}
                opacity={0.6}>
                {[
                  item.size.trim().split(' ').splice(0, 2).join(' '),
                  item.extension,
                  item.language,
                ].join(' \u2022 ')}
              </Text>
            </Box>

            {status === 'downloading' ? (
              <Row alignItems={'center'}>
                <Box flex={1} marginRight={'s'}>
                  <ProgressBar indeterminate />
                </Box>
                <IconButton
                  icon={'close'}
                  mode="contained-tonal"
                  onPress={callCancelDownload}
                  size={sizes.m}
                />
              </Row>
            ) : null}
          </Box>
        </Row>
      </TouchableRipple>
    </Animated.View>
  );
};

export default RemoteBookItem;
