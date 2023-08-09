import React, {useCallback} from 'react';
import {FAB, Portal} from 'react-native-paper';
import {
  CollectionItem,
  CollectionsTabHeader,
  CreateCollectionDialog,
} from '@/components';
import {Box} from '@/core';
import {useAppTheme, useCollections, useToggle} from '@/hooks';
import {ListRenderItem, useWindowDimensions} from 'react-native';
import {CollectionModel} from '@/database';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const CollectionsScreen = () => {
  const [
    isCreateCollectionDialogVisible,
    toggleIsCreateCollectionDialogVisible,
  ] = useToggle();
  const {sizes, spacing} = useAppTheme();
  const collections = useCollections();

  const {width} = useWindowDimensions();
  const nbrOfColumns = Math.floor(
    width / (sizes.collection_item_width + spacing.m),
  );

  const renderItem: ListRenderItem<CollectionModel> = ({item}) => {
    return <CollectionItem item={item} />;
  };

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: sizes.collection_item_height,
      offset: sizes.collection_item_height * index,
      index,
    }),
    [sizes.collection_item_height],
  );

  return (
    <>
      <CollectionsTabHeader />

      <Animated.FlatList
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
        columnWrapperStyle={
          nbrOfColumns === 1
            ? undefined
            : {
                columnGap: spacing.m,
              }
        }
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Box height={sizes.FAB} />}
        contentContainerStyle={{paddingHorizontal: spacing.m}}
        ItemSeparatorComponent={ItemDivider}
        getItemLayout={getItemLayout}
        data={collections}
        key={nbrOfColumns}
        numColumns={nbrOfColumns}
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
          label={'Add'}
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
