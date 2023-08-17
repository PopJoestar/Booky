import React from 'react';
import {FAB} from 'react-native-paper';
import {CollectionItem, CollectionsTabHeader} from '@/components';
import {Box} from '@/core';
import {useAppTheme, useCollections} from '@/hooks';
import {CollectionModel} from '@/database';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {useTranslation} from 'react-i18next';
import {FlashList, FlashListProps, ListRenderItem} from '@shopify/flash-list';
import {useModal} from '@/stores';
import {Modals} from '@/types/modal';
import {OpenModalFunction} from '@/stores/modalStore';

const AnimatedFlashList =
  Animated.createAnimatedComponent<FlashListProps<CollectionModel>>(FlashList);

const CollectionsScreen = () => {
  const {t} = useTranslation();
  const openModal = useModal<Modals, OpenModalFunction<Modals>>(
    state => state.openModal,
  );

  const {sizes, spacing} = useAppTheme();
  const collections = useCollections();

  const renderItem: ListRenderItem<CollectionModel> = ({item}) => {
    return <CollectionItem item={item} />;
  };

  const showCreateCollectionDialog = () => {
    openModal('create_collection');
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
          onPress={showCreateCollectionDialog}
        />
      </Box>
    </>
  );
};

const ItemDivider = () => {
  const {spacing} = useAppTheme();
  return <Box height={spacing.m} />;
};

export default CollectionsScreen;
