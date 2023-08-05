import React, {useState} from 'react';
import {Dialog, DialogProps, RadioButton} from 'react-native-paper';
import {Box, Button, Text} from '@/core';
import {useTranslation} from 'react-i18next';
import {BookModel} from '@/database';
import {Constants} from '@/constants';
import {StyleSheet} from 'react-native';
import {useAppTheme, useDownloadBook} from '@/hooks';
import {BookService} from '@/services';
import {requestExternalStoragePermission} from '@/utils/permissions';

type Props = {
  book: BookModel;
} & Omit<DialogProps, 'children'>;

const DownloadBookDialog = ({book, onDismiss, ...rest}: Props) => {
  const {spacing} = useAppTheme();
  const {t} = useTranslation();

  const {downloadBook} = useDownloadBook();

  const [selectedDownloadLinkIndex, setSelectedDownloadLinkIndex] = useState(
    BookService.getDefaultDownloadHostIndex(book.downloadLinks!.length),
  );

  const _downloadBook = async () => {
    const isExternalStorageManager = await requestExternalStoragePermission();

    if (!isExternalStorageManager) {
      // TODO: Universal snackbar
      return;
    }
    if (onDismiss) {
      onDismiss();
    }
    downloadBook(book, selectedDownloadLinkIndex);
  };

  return (
    <Dialog {...rest} onDismiss={onDismiss} dismissableBackButton dismissable>
      <Dialog.Title numberOfLines={2}>{book.title}</Dialog.Title>
      <Dialog.Content>
        <Box rowGap={'l'}>
          <Text>{t('common:choose_gateway', {title: book.title})}</Text>

          <RadioButton.Group
            value={selectedDownloadLinkIndex.toString(10)}
            onValueChange={selected => {
              setSelectedDownloadLinkIndex(parseInt(selected, 10));
            }}>
            <Box>
              {book.downloadLinks
                ?.filter(({host}) =>
                  Constants.VALID_HOSTS.includes(host.trim().toLowerCase()),
                )
                .map((downloadLink, index) => (
                  <RadioButton.Item
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
        <Button onPress={onDismiss}>{t('common:no')}</Button>
        <Button onPress={_downloadBook}>{t('common:yes')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  radioButtonLabel: {textAlign: 'left'},
});

export default DownloadBookDialog;
