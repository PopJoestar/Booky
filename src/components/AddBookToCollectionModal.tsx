import {
  Box,
  Button,
  ControlledTextInput,
  Row,
  ScrollView,
  Text,
  TouchableRipple,
} from '@/core';
import {BookModel, useObject, useRealm} from '@/database';
import {
  useBookRepository,
  useCollectionRepository,
  useCollections,
} from '@/hooks';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';
import Styles from '@/utils/styles';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Keyboard} from 'react-native';
import {Checkbox, Dialog} from 'react-native-paper';

//TODO: clean
const AddBookToCollectionModal = () => {
  const {t} = useTranslation();
  const realm = useRealm();
  const collections = useCollections();
  const {updateBook} = useBookRepository();

  const {closeModal, modals, params} = useModal<Modals>();

  const bookId = params.add_book_to_collection.bookId;

  const book = useObject(BookModel, bookId as Realm.BSON.ObjectId);

  const [selectedCollectionIds, setSelectedCollectionIds] = useState(
    book ? book.collections : [],
  );

  const {control, handleSubmit, setValue} = useForm<{
    newCollectionName: string;
  }>();
  const {createCollection} = useCollectionRepository();

  const close = () => closeModal('add_book_to_collection');

  const onSelectCollection = (collectionId: Realm.BSON.ObjectId) => {
    const collectionIndex = selectedCollectionIds.findIndex(id =>
      id.equals(collectionId),
    );
    const temp = [...selectedCollectionIds];

    if (collectionIndex === -1) {
      temp.push(collectionId);
      setSelectedCollectionIds(temp);
      return;
    }

    temp.splice(collectionIndex, 1);
    setSelectedCollectionIds(temp);
  };

  const _createCollection = handleSubmit(({newCollectionName}) => {
    createCollection(newCollectionName);
    setValue('newCollectionName', '');
    Keyboard.dismiss();
  });

  const updateBookCollections = () => {
    if (book == null) {
      return;
    }
    updateBook(book.md5!, {collections: selectedCollectionIds});

    realm.write(() => {
      collections.forEach(collection => {
        const bookIndexInCollection = collection.books.findIndex(_book =>
          _book._id.equals(book._id),
        );

        const isCollectionSelected =
          selectedCollectionIds.findIndex(selectedCollection =>
            selectedCollection.equals(collection.id),
          ) !== -1;

        if (isCollectionSelected && bookIndexInCollection === -1) {
          collection.books.push(book);
        } else if (!isCollectionSelected && bookIndexInCollection !== -1) {
          collection.books.splice(bookIndexInCollection, 1);
        }
      });
    });
    close();
  };

  return (
    <Dialog
      dismissable={false}
      dismissableBackButton
      visible={modals.includes('add_book_to_collection')}
      style={Styles.dialogWrapper}
      onDismiss={close}>
      <Dialog.Title>{book?.title}</Dialog.Title>
      <Dialog.Content>
        <Box>
          <Row alignItems={'center'} columnGap={'s'}>
            <Box flex={1}>
              <ControlledTextInput
                control={control}
                onSubmitEditing={_createCollection}
                name="newCollectionName"
                label={t('collection:enter_collection_name')}
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
                onPress={() => onSelectCollection(collection.id)}>
                <Row
                  alignItems={'center'}
                  columnGap={'m'}
                  paddingVertical={'s'}>
                  <Box flex={1}>
                    <Text variant={'bodyLarge'}>{collection.name}</Text>
                  </Box>
                  <Checkbox
                    status={
                      selectedCollectionIds.findIndex(c =>
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
        <Button onPress={close}>{t('common:dismiss')}</Button>
        <Button onPress={updateBookCollections}>{t('common:confirm')}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default AddBookToCollectionModal;
