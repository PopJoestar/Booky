import {Box, Button, ControlledTextInput} from '@/core';
import {CollectionModel, useObject} from '@/database';
import {useCollectionRepository} from '@/hooks';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Dialog} from 'react-native-paper';

const RenameCollectionDialog = () => {
  const {modals, closeModal, params} = useModal<Modals>();
  const collectionId = params.rename_collection.collectionId;
  const {t} = useTranslation();

  const collection = useObject(
    CollectionModel,
    collectionId as Realm.BSON.ObjectId,
  );

  const {control, handleSubmit} = useForm<{name: string}>({
    defaultValues: {name: collection?.name},
  });
  const {updateCollection} = useCollectionRepository();

  const renameCollection = handleSubmit(({name}) => {
    updateCollection(collection!.id, {name});
    closeModal('rename_collection');
  });

  return (
    <Dialog
      visible={modals.includes('rename_collection')}
      dismissable={false}
      dismissableBackButton
      onDismiss={() => closeModal('rename_collection')}>
      <Dialog.Title numberOfLines={2}>
        {t('collection:rename_collection', {name: collection?.name})}
      </Dialog.Title>
      <Dialog.Content>
        <Box rowGap={'m'}>
          <ControlledTextInput
            control={control}
            onSubmitEditing={renameCollection}
            rules={{
              required: {
                value: true,
                message: t('common:field_required'),
              },
              minLength: {
                value: 3,
                message: t('common:field_min_length', {count: 3}),
              },
            }}
            name="name"
            label={t('collection:enter_collection_name')}
          />
        </Box>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => closeModal('rename_collection')}>
          {t('common:dismiss')}
        </Button>
        <Button onPress={renameCollection}>{t('common:confirm')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default RenameCollectionDialog;
