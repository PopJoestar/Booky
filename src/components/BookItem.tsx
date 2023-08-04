import {useBookObject, useBookDownloadInfoObject, useToggle} from '@/hooks';
import {useDownloadBook} from '@/hooks';
import {
  Row,
  Box,
  TouchableRipple,
  Image,
  Text,
  ProgressBar,
  IconButton,
} from '@/core';
import {sizes} from '@/theme/layout';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Menu, Surface} from 'react-native-paper';

import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import BookStatusIcon from './BookStatusIcon';
import {Book} from '@/interfaces/Book';
import {BookStatus} from '@/types/status';

type Props = {item: Book};

const BookItem = ({item}: Props) => {
  const {t} = useTranslation('common');
  const savedBook = useBookObject(item.md5 ?? '');

  const downloadInfo = useBookDownloadInfoObject(item.md5 ?? '');
  const {cancelDownload} = useDownloadBook();

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

    return undefined;
  };

  const callCancelDownload = () => {
    cancelDownload(item.md5!);
  };

  const status = getStatus();

  const [isMenuVisible, toggleIsMenuVisible] = useToggle();

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableRipple
        backgroundColor="surface"
        paddingLeft="m"
        paddingVertical={'m'}
        onPress={() => {}}
        paddingRight="m">
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

                <BookStatusIcon
                  status={status}
                  alignSelf="flex-start"
                  marginRight={'m'}
                />
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

            {status !== 'downloading' ? (
              <Box alignSelf={'flex-end'}>
                <Menu
                  visible={isMenuVisible}
                  onDismiss={toggleIsMenuVisible}
                  anchor={
                    <IconButton
                      icon={'dots-horizontal'}
                      onPress={toggleIsMenuVisible}
                      alignSelf={'flex-end'}
                    />
                  }>
                  <Menu.Item
                    onPress={() => {}}
                    title={t('common:see_details')}
                  />
                  <Menu.Item
                    onPress={() => {}}
                    title={t('common:add_to_a_collection')}
                  />
                  <Menu.Item
                    onPress={() => {}}
                    title={t('common:mark_as_read')}
                  />
                  <Menu.Item
                    onPress={() => {}}
                    title={t('common:remove_from_library')}
                  />
                  <Menu.Item
                    onPress={() => {}}
                    title={t('common:remove_everywhere')}
                  />
                </Menu>
              </Box>
            ) : null}

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

export default BookItem;
