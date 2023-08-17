import React from 'react';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';
import {useTranslation} from 'react-i18next';
import {BookModel, useObject} from '@/database';
import {useBookRepository} from '@/hooks';
import ConfirmationDialog from './ConfirmationDialog';
import {requestExternalStoragePermission} from '@/utils/permissions';
import {deleteFile} from '@/utils/files';

const ConfirmationRemoveBookEverywhere = () => {
  const {t} = useTranslation();
  const {modals, closeModal, params} = useModal<Modals>();

  const bookId = params.remove_book_everywhere.bookId;

  const book = useObject(BookModel, bookId as Realm.BSON.ObjectId);
  const {removeBook} = useBookRepository();

  const close = () => closeModal('remove_book_everywhere');

  const removeEverywhere = async () => {
    if (book == null) {
      return;
    }
    if (book.filePath === '') {
      close();
      setTimeout(() => {
        removeBook(book);
      }, 1);
      return;
    }

    const isExternalStorageManager = await requestExternalStoragePermission();

    if (!isExternalStorageManager) {
      close();
      // TODO: Show snackbar
      return;
    }

    await deleteFile(book.filePath);

    close();

    setTimeout(() => {
      removeBook(book);
    }, 1);
  };

  return (
    <ConfirmationDialog
      onDismiss={close}
      onConfirm={removeEverywhere}
      onReject={close}
      visible={modals.includes('remove_book_everywhere')}
      content={t('library:confirm_remove_everywhere', {
        title: book?.title,
      })}
    />
  );
};

export default ConfirmationRemoveBookEverywhere;
