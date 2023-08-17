import {Box, Button, ControlledTextInput} from '@/core';
import {useCollectionRepository} from '@/hooks';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Dialog} from 'react-native-paper';

const CreateCollectionDialog = () => {
  const {closeModal, modals} = useModal<Modals>();
  const {t} = useTranslation();
  const {control, handleSubmit, reset} = useForm<{name: string}>();
  const {createCollection} = useCollectionRepository();

  const _createCollection = handleSubmit(({name}) => {
    createCollection(name);
    reset({name: ''});
  });

  const close = () => closeModal('create_collection');

  return (
    <Dialog
      visible={modals.includes('create_collection')}
      dismissable={false}
      dismissableBackButton
      onDismiss={close}>
      <Dialog.Title>{t('collection:create_collection')}</Dialog.Title>
      <Dialog.Content>
        <Box rowGap={'m'}>
          <ControlledTextInput
            control={control}
            onSubmitEditing={_createCollection}
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
        <Button onPress={close}>{t('common:dismiss')}</Button>
        <Button onPress={_createCollection}>{t('common:create')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default CreateCollectionDialog;
