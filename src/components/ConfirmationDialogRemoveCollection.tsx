import React from 'react';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';
import {CollectionModel, useObject} from '@/database';
import {useTranslation} from 'react-i18next';
import {useCollectionRepository} from '@/hooks';
import ConfirmationDialog from './ConfirmationDialog';

const ConfirmationDialogRemoveCollection = () => {
  const {t} = useTranslation();

  const {modals, closeModal, params} = useModal<Modals>();
  const collectionId = params.remove_collection.collectionId;

  const {removeCollection} = useCollectionRepository();

  const collection = useObject(
    CollectionModel,
    collectionId as Realm.BSON.ObjectId,
  );

  const handleRemoveCollection = () => {
    closeModal('remove_collection');
    if (collection == null) {
      return;
    }
    setTimeout(() => {
      removeCollection(collection.id);
    }, 1);
  };

  const close = () => closeModal('rename_collection');

  return (
    <ConfirmationDialog
      onDismiss={close}
      onConfirm={handleRemoveCollection}
      onReject={close}
      visible={modals.includes('remove_collection')}
      content={t('collection:remove_collection', {name: collection?.name})}
    />
  );
};

export default ConfirmationDialogRemoveCollection;
