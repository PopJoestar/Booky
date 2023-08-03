import React from 'react';
import {FAB} from 'react-native-paper';
import {CollectionScreenHeader} from '@/components';
import {Box} from '@/core';

const CollectionsScreen = () => {
  return (
    <>
      <CollectionScreenHeader />
      <Box
        position={'absolute'}
        bottom={0}
        right={0}
        marginBottom="m"
        marginRight="m">
        <FAB icon="plus" label={'Add'} />
      </Box>
    </>
  );
};

export default CollectionsScreen;
