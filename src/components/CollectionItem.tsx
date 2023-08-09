import {
  Box,
  IconButton,
  Image,
  Row,
  Surface,
  Text,
  TouchableRipple,
} from '@/core';
import {CollectionModel} from '@/database';
import {useAppTheme, useCollectionRepository, useToggle} from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Menu, Portal} from 'react-native-paper';
import ConfirmationDialog from './ConfirmationDialog';
import RenameCollectionDialog from './RenameCollectionDialog';

type Props = {
  item: CollectionModel;
};

const CollectionItem = ({item}: Props) => {
  const {t} = useTranslation();
  const {sizes, spacing} = useAppTheme();
  const navigation = useNavigation();
  const {removeCollection} = useCollectionRepository();

  const bookImages = item.books.map(book => book.image);
  const splicedBookImages = [...bookImages].splice(0, 3);

  const [isMenuVisible, toggleIsMenuVisible] = useToggle();
  const [
    isRemoveConfirmationDialogVisible,
    toggleIsRemoveConfirmationDialogVisible,
  ] = useToggle();
  const [
    isRenameCollectionDialogVisible,
    toggleIsRenameCollectionDialogVisible,
  ] = useToggle();

  const goToCollectionScreen = () => {
    navigation.navigate('collection', {collectionId: item.id.toHexString()});
  };

  const handleOnPressRemoveCollection = () => {
    toggleIsMenuVisible();
    toggleIsRemoveConfirmationDialogVisible();
  };

  const handleOnPressRenameCollection = () => {
    toggleIsMenuVisible();
    toggleIsRenameCollectionDialogVisible();
  };

  const handleRemoveCollection = () => {
    toggleIsRemoveConfirmationDialogVisible();
    setTimeout(() => {
      removeCollection(item.id);
    }, 1);
  };

  return (
    <>
      <Surface
        borderRadius={'sm'}
        borderWidth={1}
        borderColor={'outlineVariant'}>
        <TouchableRipple
          onPress={goToCollectionScreen}
          flex={1}
          padding={'s'}
          paddingTop={'m'}
          width={sizes.collection_item_width}
          height={sizes.collection_item_height}>
          <Box rowGap={'s'} flex={1}>
            <Box flex={2} minHeight={112}>
              {item.books.length === 0 ? (
                <Box flex={1} alignItems={'center'} justifyContent={'center'}>
                  <Text variant={'bodySmall'}>{t('common:no_book')}</Text>
                </Box>
              ) : null}
              {item.books.length > 0 ? (
                <Row
                  flex={1}
                  flexShrink={0}
                  flexWrap={'wrap'}
                  rowGap={'s'}
                  justifyContent={'space-between'}>
                  {splicedBookImages.map((image, index) => (
                    <Box key={index}>
                      <Image
                        source={{uri: image}}
                        height={70}
                        width={
                          (sizes.collection_item_width - 10 - spacing.s * 2) / 2
                        }
                        contentFit="contain"
                        alignSelf={'flex-start'}
                      />
                    </Box>
                  ))}
                  {bookImages.length > 3 ? (
                    <Box
                      width={
                        (sizes.collection_item_width - 10 - spacing.s * 2) / 2
                      }
                      style={styles.fakeImage}
                      height={70}>
                      <Box
                        backgroundColor={'surfaceContainerHighest'}
                        flex={1}
                        alignItems={'center'}
                        justifyContent={'center'}>
                        <Text numberOfLines={1}>{`+${
                          bookImages.length - 3
                        }`}</Text>
                      </Box>
                    </Box>
                  ) : null}
                </Row>
              ) : null}
            </Box>
            <Box flex={1}>
              <Row
                alignItems={'center'}
                flex={1}
                justifyContent={'space-between'}>
                <Text variant={'titleSmall'} numberOfLines={2}>
                  {item.name}
                </Text>
                <Menu
                  visible={isMenuVisible}
                  onDismiss={toggleIsMenuVisible}
                  anchor={
                    <IconButton
                      icon={'dots-horizontal'}
                      onPress={toggleIsMenuVisible}
                    />
                  }>
                  <Menu.Item
                    onPress={handleOnPressRenameCollection}
                    title={t('rename')}
                    leadingIcon={'pencil-outline'}
                  />

                  <Menu.Item
                    onPress={handleOnPressRemoveCollection}
                    title={t('remove')}
                    leadingIcon={'trash-can-outline'}
                  />
                </Menu>
              </Row>
            </Box>
          </Box>
        </TouchableRipple>
      </Surface>

      <Portal>
        <ConfirmationDialog
          onDismiss={toggleIsRemoveConfirmationDialogVisible}
          onConfirm={handleRemoveCollection}
          onReject={toggleIsRemoveConfirmationDialogVisible}
          visible={isRemoveConfirmationDialogVisible}
          content={t('collection:remove_collection', {name: item.name})}
        />
        <RenameCollectionDialog
          visible={isRenameCollectionDialogVisible}
          onDismiss={toggleIsRenameCollectionDialogVisible}
          collection={item}
        />
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  fakeImage: {
    paddingHorizontal: 12,
  },
});

export default CollectionItem;
