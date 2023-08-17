import React from 'react';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';
import {useTranslation} from 'react-i18next';
import {BookModel, useObject} from '@/database';
import {useBookRepository} from '@/hooks';
import ConfirmationDialog from './ConfirmationDialog';

const ConfirmationDialogRemoveBookFromLibrary = () => {
  const {t} = useTranslation();
  const {modals, closeModal, params} = useModal<Modals>();

  const bookId = params.remove_book_from_library.bookId;

  const book = useObject(BookModel, bookId as Realm.BSON.ObjectId);
  const {removeBook} = useBookRepository();

  const close = () => closeModal('remove_book_from_library');

  const removeFromLibrary = () => {
    close();
    if (book == null) {
      return;
    }
    setTimeout(() => {
      removeBook(book);
    }, 1);
  };

  return (
    <ConfirmationDialog
      onDismiss={close}
      onConfirm={removeFromLibrary}
      onReject={close}
      visible={modals.includes('remove_book_from_library')}
      content={t('library:confirm_remove_from_library', {
        title: book?.title,
      })}
    />
  );
};

export default ConfirmationDialogRemoveBookFromLibrary;
