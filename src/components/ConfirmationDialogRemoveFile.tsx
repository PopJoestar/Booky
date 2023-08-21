import React from 'react';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';
import {useTranslation} from 'react-i18next';

import ConfirmationDialog from './ConfirmationDialog';
import {requestExternalStoragePermission} from '@/utils/permissions';
import {deleteFile} from '@/utils/files';
import {useBookRepository} from '@/hooks';
import {BookModel, useObject} from '@/database';

const ConfirmationDialogRemoveFile = () => {
  const {t} = useTranslation();
  const {modals, closeModal, params} = useModal<Modals>();

  const bookId = params.remove_file.bookId;
  const book = useObject(BookModel, bookId as Realm.BSON.ObjectId);

  const {updateBook} = useBookRepository();

  const close = () => closeModal('remove_file');

  const removeFile = async () => {
    if (book == null) {
      return;
    }
    const isExternalStorageManager = await requestExternalStoragePermission();

    if (!isExternalStorageManager) {
      close();
      // TODO: Show snackbar
      return;
    }

    close();

    try {
      await deleteFile(book.filePath);
    } catch {}

    setTimeout(() => {
      updateBook(book.md5!, {filePath: ''});
    }, 1);
  };

  const filepathSplits = book?.filePath.split('/');

  return (
    <ConfirmationDialog
      onDismiss={close}
      onConfirm={removeFile}
      onReject={close}
      visible={modals.includes('remove_file')}
      content={t('library:confirm_remove_file', {
        path:
          filepathSplits == null || filepathSplits.length === 0
            ? ''
            : decodeURI(filepathSplits[filepathSplits.length - 1]),
      })}
    />
  );
};

export default ConfirmationDialogRemoveFile;
