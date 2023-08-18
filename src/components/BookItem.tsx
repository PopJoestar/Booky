import {
  useBookDownloadInfoObject,
  useBookRepository,
  useMessageDisplayer,
  useToggle,
} from '@/hooks';
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
import {BookStatus} from '@/types/status';
import {BookModel} from '@/database';
import {BookService} from '@/services';
import {BaseError} from '@/types/errors';
import {ErrorConstant} from '@/constants';
import {Modals} from '@/types/modal';
import {
  OpenModalFunction,
  selectOpenModal,
  useModal,
} from '@/stores/modalStore';

type Props = {item: BookModel};

const BookItem = ({item}: Props) => {
  const {t} = useTranslation('common');
  const openModal = useModal<Modals, OpenModalFunction<Modals>>(
    selectOpenModal,
  );
  const {showMessage} = useMessageDisplayer();
  const [isMenuVisible, toggleIsMenuVisible] = useToggle();

  const downloadInfo = useBookDownloadInfoObject(item.md5 ?? '');
  const {updateBook} = useBookRepository();
  const {cancelDownload} = useDownloadBook();

  const getStatus = (): BookStatus | undefined => {
    if (downloadInfo != null) {
      return 'downloading';
    }
    if (item.filePath !== '') {
      return 'downloaded';
    }

    return undefined;
  };

  const callCancelDownload = () => {
    cancelDownload(item.md5!);
  };

  const toggleIsBookRead = () => {
    updateBook(item.md5!, {isRead: !item.isRead});
    toggleIsMenuVisible();
  };

  const handleOnPressRemoveFromLibrary = () => {
    toggleIsMenuVisible();
    setTimeout(() => {
      openModal('remove_book_from_library', {bookId: item.md5!});
    }, 1);
  };
  const handleOnPressRemoveEverywhere = () => {
    toggleIsMenuVisible();
    setTimeout(() => {
      openModal('remove_book_everywhere', {bookId: item.md5!});
    }, 1);
  };
  const handleOnPressDownload = () => {
    toggleIsMenuVisible();
    setTimeout(() => {
      openModal('download_book', {bookId: item.md5!});
    }, 1);
  };
  const handleOnPressAddToCollection = () => {
    toggleIsMenuVisible();
    setTimeout(() => {
      openModal('add_book_to_collection', {bookId: item.md5!});
    }, 1);
  };

  const status = getStatus();

  const handleOnPressBook = async () => {
    // The book is not downloaded yet
    if (status === undefined) {
      openModal('download_book', {bookId: item.md5!});
      return;
    }

    if (status === 'downloaded') {
      try {
        await BookService.openBook(item);
      } catch (error) {
        if (
          error instanceof BaseError &&
          error.code === ErrorConstant.NO_ACTIVITY_FOUND_TO_OPEN_FILE
        ) {
          showMessage({
            message: t('common:no_application_to_open_file', {
              file: `${item.title}.${item.extension.toLowerCase()}`,
            }),
            position: {bottom: 70},
          });
        }
      }
    }
  };

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <TouchableRipple
        backgroundColor="surface"
        paddingLeft="m"
        flex={1}
        paddingVertical={'m'}
        onPress={handleOnPressBook}
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

            {item.isRead ? (
              <Box
                alignSelf={'flex-start'}
                position={'absolute'}
                padding={'xxs'}
                backgroundColor={'inverseSurface'}
                borderRadius={'xs'}>
                <Text
                  color={'inverseOnSurface'}
                  variant={'labelSmall'}
                  textTransform={'uppercase'}
                  fontWeight={'bold'}>
                  {t('common:read')}
                </Text>
              </Box>
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
                  : t('common:unkown_author')}
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
                  // Force the menu to disappear when the item is removed
                  key={item.md5!}
                  visible={isMenuVisible && !!item.md5}
                  onDismiss={toggleIsMenuVisible}
                  anchor={
                    <IconButton
                      icon={'dots-horizontal'}
                      onPress={toggleIsMenuVisible}
                      alignSelf={'flex-end'}
                    />
                  }>
                  {status === undefined ? (
                    <Menu.Item
                      onPress={handleOnPressDownload}
                      title={t('common:download')}
                    />
                  ) : null}
                  <Menu.Item
                    onPress={handleOnPressAddToCollection}
                    title={t('collection:add_to_a_collection')}
                  />
                  <Menu.Item
                    onPress={toggleIsBookRead}
                    title={
                      item.isRead
                        ? t('common:mark_as_unread')
                        : t('common:mark_as_read')
                    }
                  />
                  <Menu.Item
                    onPress={handleOnPressRemoveFromLibrary}
                    title={t('library:remove_from_library')}
                  />
                  <Menu.Item
                    onPress={handleOnPressRemoveEverywhere}
                    title={t('library:remove_everywhere')}
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
