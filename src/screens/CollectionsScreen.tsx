import React from 'react';
import {FAB} from 'react-native-paper';
import {Box} from '../shared/components';
import {CollectionScreenHeader} from '@/components';

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
