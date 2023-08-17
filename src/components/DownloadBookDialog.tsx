import React, {useState} from 'react';
import {Dialog, RadioButton} from 'react-native-paper';
import {Box, Button, Text} from '@/core';
import {useTranslation} from 'react-i18next';
import {BookModel, useObject} from '@/database';
import {Constants} from '@/constants';
import {StyleSheet} from 'react-native';
import {useAppTheme, useDownloadBook} from '@/hooks';
import {BookService} from '@/services';
import {requestExternalStoragePermission} from '@/utils/permissions';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';

const DownloadBookDialog = () => {
  const {spacing} = useAppTheme();

  const {closeModal, modals, params} = useModal<Modals>();

  const bookId = params.download_book.bookId;

  const book = useObject(BookModel, bookId as Realm.BSON.ObjectId);

  const {t} = useTranslation();

  const {downloadBook} = useDownloadBook();

  const [selectedDownloadLinkIndex, setSelectedDownloadLinkIndex] = useState(
    BookService.getDefaultDownloadHostIndex(book!.downloadLinks!.length),
  );

  const close = () => closeModal('download_book');

  const _downloadBook = async () => {
    if (book == null) {
      return;
    }
    const isExternalStorageManager = await requestExternalStoragePermission();

    if (!isExternalStorageManager) {
      close();
      // TODO: storage permission snackbar
      return;
    }
    close();
    downloadBook(book, selectedDownloadLinkIndex);
  };

  return (
    <Dialog
      visible={modals.includes('download_book')}
      onDismiss={close}
      dismissableBackButton
      dismissable>
      <Dialog.Title numberOfLines={2}>{book?.title}</Dialog.Title>
      <Dialog.Content>
        <Box rowGap={'l'}>
          <Text>{t('common:choose_gateway', {title: book?.title})}</Text>

          <RadioButton.Group
            value={selectedDownloadLinkIndex.toString(10)}
            onValueChange={selected => {
              setSelectedDownloadLinkIndex(parseInt(selected, 10));
            }}>
            <Box>
              {book?.downloadLinks
                ?.filter(({host}) =>
                  Constants.VALID_HOSTS.includes(host.trim().toLowerCase()),
                )
                .map((downloadLink, index) => (
                  <RadioButton.Item
                    key={index}
                    label={downloadLink.host}
                    value={index.toString(10)}
                    position="leading"
                    labelStyle={[
                      styles.radioButtonLabel,
                      {marginLeft: spacing.s},
                    ]}
                  />
                ))}
            </Box>
          </RadioButton.Group>
        </Box>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={close}>{t('common:no')}</Button>
        <Button onPress={_downloadBook}>{t('common:yes')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  radioButtonLabel: {textAlign: 'left'},
});

export default DownloadBookDialog;
