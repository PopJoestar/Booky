import {
  Box,
  Button,
  ControlledTextInput,
  Row,
  ScrollView,
  Text,
  TouchableRipple,
} from '@/core';
import {BookModel} from '@/database';
import {useCollectionRepository, useCollections} from '@/hooks';
import React from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard} from 'react-native';
import {Checkbox, Dialog, DialogProps} from 'react-native-paper';

type Props = {
  book: BookModel;
} & Omit<DialogProps, 'children'>;

const AddBookToCollectionModal = ({book, onDismiss, ...rest}: Props) => {
  const {t} = useTranslation();
  const {control, handleSubmit, setValue} = useForm<{
    newCollectionName: string;
  }>();
  const {createCollection} = useCollectionRepository();

  const collections = useCollections();

  const _createCollection = handleSubmit(({newCollectionName}) => {
    createCollection(newCollectionName);
    setValue('newCollectionName', '');
    Keyboard.dismiss();
  });
  return (
    <Dialog {...rest} dismissable dismissableBackButton onDismiss={onDismiss}>
      <Dialog.Title>{book.title}</Dialog.Title>
      <Dialog.Content>
        <Box>
          <Row alignItems={'center'} columnGap={'s'}>
            <Box flex={1}>
              <ControlledTextInput
                control={control}
                name="newCollectionName"
                label={t('common:enter_collection_name')}
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
              />
            </Box>
            <Button onPress={_createCollection}>{t('common:create')}</Button>
          </Row>
        </Box>
      </Dialog.Content>
      {collections.length === 0 ? null : (
        <Dialog.ScrollArea>
          <ScrollView>
            {collections.map(collection => (
              <TouchableRipple
                key={collection.id.toHexString()}
                onPress={() => {}}>
                <Row
                  alignItems={'center'}
                  columnGap={'m'}
                  paddingVertical={'s'}>
                  <Box flex={1}>
                    <Text variant={'bodyLarge'}>{collection.name}</Text>
                  </Box>
                  <Checkbox
                    status={
                      book.collections.findIndex(c =>
                        c.equals(collection.id),
                      ) !== -1
                        ? 'checked'
                        : 'unchecked'
                    }
                  />
                </Row>
              </TouchableRipple>
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
      )}
      <Dialog.Actions>
        <Button>{t('common:confirm')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AddBookToCollectionModal;
