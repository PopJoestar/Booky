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
import {useAppTheme, useToggle} from '@/hooks';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import {Menu} from 'react-native-paper';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';

type Props = {
  item: CollectionModel;
};

const MAX_COVERS = 7;

const CollectionItem = ({item}: Props) => {
  const {t} = useTranslation();
  const {sizes, spacing} = useAppTheme();

  const navigation = useNavigation();
  const {openModal} = useModal<Modals>();

  const bookImages = item.books.map(book => book.image);
  const splicedBookImages = [...bookImages].splice(0, MAX_COVERS);

  const [isMenuVisible, toggleIsMenuVisible] = useToggle();

  const goToCollectionScreen = () => {
    navigation.navigate('collection', {collectionId: item.id.toHexString()});
  };

  const handleOnPressRemoveCollection = () => {
    toggleIsMenuVisible();
    openModal('remove_collection', {collectionId: item.id});
  };

  const handleOnPressRenameCollection = () => {
    toggleIsMenuVisible();
    openModal('rename_collection', {collectionId: item.id});
  };

  return (
    <Surface borderRadius={'sm'} borderWidth={1} borderColor={'outlineVariant'}>
      <TouchableRipple
        onPress={goToCollectionScreen}
        flex={1}
        padding={'s'}
        paddingTop={'m'}
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
                flexWrap={'wrap'}
                rowGap={'s'}
                justifyContent={'center'}>
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
                {bookImages.length > MAX_COVERS ? (
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
                        bookImages.length - MAX_COVERS
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
  );
};

const styles = StyleSheet.create({
  fakeImage: {
    paddingHorizontal: 12,
  },
});

export default CollectionItem;
