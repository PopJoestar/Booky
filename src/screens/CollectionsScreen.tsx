import React from 'react';
import {FAB, Portal} from 'react-native-paper';
import {CollectionScreenHeader, CreateCollectionDialog} from '@/components';
import {Box} from '@/core';
import {useToggle} from '@/hooks';

const CollectionsScreen = () => {
  const [
    isCreateCollectionDialogVisible,
    toggleIsCreateCollectionDialogVisible,
  ] = useToggle();
  return (
    <>
      <CollectionScreenHeader />
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

export default CollectionsScreen;
