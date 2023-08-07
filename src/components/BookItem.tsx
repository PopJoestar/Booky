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
  AnimatedBox,
} from '@/core';
import {sizes} from '@/theme/layout';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Menu, Portal, Surface} from 'react-native-paper';

import Animated, {
  BounceIn,
  BounceOut,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import BookStatusIcon from './BookStatusIcon';
import {BookStatus} from '@/types/status';
import {BookModel} from '@/database';
import ConfirmationDialog from './ConfirmationDialog';
import {requestExternalStoragePermission} from '@/utils/permissions';
import {deleteFile} from '@/utils/files';
import StorageAccessSnackBar from './StorageAccessSnackBar';
import DownloadBookDialog from './DownloadBookDialog';
import {BookService} from '@/services';
import AddBookToCollectionModal from './AddBookToCollectionModal';
import {BaseError} from '@/types/errors';
import {ErrorConstant} from '@/constants';

type Props = {item: BookModel};

const BookItem = ({item}: Props) => {
  const {t} = useTranslation('common');
  const {showMessage} = useMessageDisplayer();
  const [isMenuVisible, toggleIsMenuVisible] = useToggle();
  const [
    isRemoveFromLibraryConfirmationDialogVisible,
    toggleIsRemoveFromLibraryConfirmationDialogVisible,
  ] = useToggle();
  const [
    isRemoveEverywhereConfirmationDialogVisible,
    toggleIsRemoveEverywhereConfirmationDialogVisible,
  ] = useToggle();
  const [isStorageAccessSnackbarVisible, toggleIsStorageAccessSnackbarVisible] =
    useToggle();
  const [isDownloadBookDialogVisible, toggleIsDownloadBookDialogVisible] =
    useToggle();
  const [
    isAddBookToCollectionModalVisible,
    toggleIsAddBookToCollectionModalVisible,
  ] = useToggle();

  const downloadInfo = useBookDownloadInfoObject(item.md5 ?? '');
  const {updateBook, removeBook} = useBookRepository();
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
      toggleIsRemoveFromLibraryConfirmationDialogVisible();
    }, 1);
  };

  const handleOnPressAddToCollection = () => {
    toggleIsMenuVisible();
    toggleIsAddBookToCollectionModalVisible();
  };

  const removeFromLibrary = () => {
    toggleIsRemoveFromLibraryConfirmationDialogVisible();
    setTimeout(() => {
      removeBook(item);
    }, 1);
  };

  const removeEverywhere = async () => {
    if (item.filePath === '') {
      toggleIsRemoveEverywhereConfirmationDialogVisible();
      setTimeout(() => {
        removeBook(item);
      }, 1);
      return;
    }

    const isExternalStorageManager = await requestExternalStoragePermission();

    if (!isExternalStorageManager) {
      toggleIsRemoveEverywhereConfirmationDialogVisible();
      toggleIsStorageAccessSnackbarVisible();
      return;
    }

    await deleteFile(item.filePath);

    toggleIsRemoveEverywhereConfirmationDialogVisible();

    setTimeout(() => {
      removeBook(item);
    }, 1);
  };

  const handleOnPressRemoveEverywhere = () => {
    toggleIsMenuVisible();
    setTimeout(() => {
      toggleIsRemoveEverywhereConfirmationDialogVisible();
    }, 1);
  };

  const status = getStatus();

  const handleOnPressBook = async () => {
    // The book is not downloaded yet
    if (status === undefined) {
      toggleIsDownloadBookDialogVisible();
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
    <>
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
                <AnimatedBox
                  entering={BounceIn}
                  exiting={BounceOut}
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
                </AnimatedBox>
              ) : null}
            </Surface>

            <Box flex={1} paddingLeft="m">
              <Box flex={1}>
                <Row alignItems={'center'}>
                  <Box flex={1}>
                    <Text
                      variant="bodyLarge"
                      color="onSurface"
                      numberOfLines={2}>
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
                        onPress={() => {
                          toggleIsMenuVisible();
                          toggleIsDownloadBookDialogVisible();
                        }}
                        title={t('common:download')}
                      />
                    ) : null}
                    <Menu.Item
                      onPress={handleOnPressAddToCollection}
                      title={t('common:add_to_a_collection')}
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
                      title={t('common:remove_from_library')}
                    />
                    <Menu.Item
                      onPress={handleOnPressRemoveEverywhere}
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
      <Portal>
        <ConfirmationDialog
          onDismiss={toggleIsRemoveFromLibraryConfirmationDialogVisible}
          onConfirm={removeFromLibrary}
          onReject={toggleIsRemoveFromLibraryConfirmationDialogVisible}
          visible={isRemoveFromLibraryConfirmationDialogVisible}
          content={t('common:confirm_remove_from_library', {title: item.title})}
        />
        <ConfirmationDialog
          onDismiss={toggleIsRemoveEverywhereConfirmationDialogVisible}
          onConfirm={removeEverywhere}
          onReject={toggleIsRemoveEverywhereConfirmationDialogVisible}
          visible={isRemoveEverywhereConfirmationDialogVisible}
          content={t('common:confirm_remove_everywhere', {title: item.title})}
        />
        <StorageAccessSnackBar
          visible={isStorageAccessSnackbarVisible}
          onDismiss={toggleIsStorageAccessSnackbarVisible}
        />
        <DownloadBookDialog
          book={item}
          visible={isDownloadBookDialogVisible}
          onDismiss={toggleIsDownloadBookDialogVisible}
        />
        {/* Fix app crash List no longer valid */}
        {item ? (
          <AddBookToCollectionModal
            book={item}
            visible={isAddBookToCollectionModalVisible}
            onDismiss={toggleIsAddBookToCollectionModalVisible}
          />
        ) : null}
      </Portal>
    </>
  );
};

export default BookItem;
