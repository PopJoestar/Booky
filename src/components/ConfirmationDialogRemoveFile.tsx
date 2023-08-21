import React from 'react';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';
import {useTranslation} from 'react-i18next';

import ConfirmationDialog from './ConfirmationDialog';
import {requestExternalStoragePermission} from '@/utils/permissions';
import {deleteFile} from '@/utils/files';

const ConfirmationDialogRemoveFile = () => {
  const {t} = useTranslation();
  const {modals, closeModal, params} = useModal<Modals>();

  const filePath = params.remove_file.filePath;

  const close = () => closeModal('remove_file');

  const removeEverywhere = async () => {
    const isExternalStorageManager = await requestExternalStoragePermission();

    if (!isExternalStorageManager) {
      close();
      // TODO: Show snackbar
      return;
    }

    await deleteFile(filePath);

    close();
  };

  return (
    <ConfirmationDialog
      onDismiss={close}
      onConfirm={removeEverywhere}
      onReject={close}
      visible={modals.includes('remove_book_everywhere')}
      content={t('library:confirm_remove_file', {
        path: filePath,
      })}
    />
  );
};

export default ConfirmationDialogRemoveFile;
