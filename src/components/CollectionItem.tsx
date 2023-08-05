import {Box, Surface, Text} from '@/core';
import {CollectionModel} from '@/database';
import {useAppTheme} from '@/hooks';
import React from 'react';

type Props = {
  item: CollectionModel;
};

const CollectionItem = ({item}: Props) => {
  const {sizes} = useAppTheme();
  return (
    <Surface
      padding={'s'}
      paddingTop={'m'}
      rowGap={'s'}
      borderWidth={1}
      borderColor={'outlineVariant'}
      borderRadius={'sm'}
      width={sizes.collection_item_width}
      height={sizes.collection_item_height}>
      <Box flex={2} minHeight={112}>
        {item.books.length === 0 ? (
          <Box flex={1} alignItems={'center'} justifyContent={'center'}>
            <Text variant={'bodySmall'}>No item</Text>
          </Box>
        ) : null}
      </Box>
      <Box flex={1}>
        <Text variant={'titleSmall'} textAlign={'center'} numberOfLines={2}>
          {item.name}
        </Text>
      </Box>
    </Surface>
  );
};

export default CollectionItem;
