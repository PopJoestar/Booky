import React from 'react';
import {FAB, Portal} from 'react-native-paper';
import {
  CollectionItem,
  CollectionsTabHeader,
  CreateCollectionDialog,
} from '@/components';
import {Box} from '@/core';
import {useAppTheme, useCollections, useToggle} from '@/hooks';
import {CollectionModel} from '@/database';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {FlashList, FlashListProps, ListRenderItem} from '@shopify/flash-list';

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<CollectionModel>>(FlashList);

const CollectionsScreen = () => {
  const {t} = useTranslation();
  const [
    isCreateCollectionDialogVisible,
    toggleIsCreateCollectionDialogVisible,
  ] = useToggle();
  const {sizes, spacing} = useAppTheme();
  const collections = useCollections();

  const renderItem: ListRenderItem<CollectionModel> = ({item}) => {
    return <CollectionItem item={item} />;
  };

  return (
    <>
      <CollectionsTabHeader />

      <AnimatedFlashList
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Box height={sizes.FAB} />}
        contentContainerStyle={{paddingHorizontal: spacing.m}}
        ItemSeparatorComponent={ItemDivider}
        estimatedItemSize={sizes.collection_item_height}
        data={collections}
        renderItem={renderItem}
      />

      <Box
        position={'absolute'}
        bottom={0}
        right={0}
        marginBottom="m"
        marginRight="m">
        <FAB
          icon="plus"
          label={t('common:add')}
          onPress={toggleIsCreateCollectionDialogVisible}
        />
      </Box>
      <Portal>
        <CreateCollectionDialog
          visible={isCreateCollectionDialogVisible}
          onDismiss={toggleIsCreateCollectionDialogVisible}
        />
      </Portal>
    </>
  );
};

const ItemDivider = () => {
  const {spacing} = useAppTheme();
  return <Box height={spacing.m} />;
};

export default CollectionsScreen;
