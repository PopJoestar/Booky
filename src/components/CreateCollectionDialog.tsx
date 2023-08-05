import {Box, Button, ControlledTextInput} from '@/core';
import {useCollectionRepository} from '@/hooks';
import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Dialog, DialogProps} from 'react-native-paper';

type Props = {} & Omit<DialogProps, 'children'>;

const CreateCollectionDialog = ({onDismiss, visible, ...rest}: Props) => {
  const {t} = useTranslation();
  const {control, handleSubmit, reset} = useForm<{name: string}>();
  const {createCollection} = useCollectionRepository();

  const _createCollection = handleSubmit(({name}) => {
    createCollection(name);
    if (onDismiss) {
      onDismiss();
    }
  });

  useEffect(() => {
    if (!visible) {
      reset({name: ''});
    }
  }, [reset, visible]);

  return (
    <Dialog
      {...rest}
      visible={visible}
      dismissable
      dismissableBackButton
      onDismiss={onDismiss}>
      <Dialog.Title>{t('common:create_collection')}</Dialog.Title>
      <Dialog.Content>
        <Box rowGap={'m'}>
          <ControlledTextInput
            control={control}
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
            label={t('common:enter_collection_name')}
          />
        </Box>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={_createCollection}>{t('common:create')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default CreateCollectionDialog;
