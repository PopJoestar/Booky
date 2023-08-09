import {Box, Button, ControlledTextInput} from '@/core';
import {CollectionModel} from '@/database';
import {useCollectionRepository} from '@/hooks';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Dialog, DialogProps} from 'react-native-paper';

type Props = {
  collection: CollectionModel;
  onDismiss: () => void;
} & Omit<DialogProps, 'children' | 'onDismiss'>;

const RenameCollectionDialog = ({
  onDismiss,
  visible,
  collection,
  ...rest
}: Props) => {
  const {t} = useTranslation();
  const {control, handleSubmit} = useForm<{name: string}>({
    defaultValues: {name: collection.name},
  });
  const {updateCollection} = useCollectionRepository();

  const renameCollection = handleSubmit(({name}) => {
    updateCollection(collection.id, {name});
    onDismiss();
  });

  return (
    <Dialog
      {...rest}
      visible={visible}
      dismissable={false}
      dismissableBackButton
      onDismiss={onDismiss}>
      <Dialog.Title numberOfLines={2}>
        {t('collection:rename_collection', {name: collection.name})}
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
        <Button onPress={onDismiss}>{t('common:dismiss')}</Button>
        <Button onPress={renameCollection}>{t('common:confirm')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default RenameCollectionDialog;
