import {Box, Image, Row, Surface, Text} from '@/core';
import {CollectionModel} from '@/database';
import {useAppTheme} from '@/hooks';
import React from 'react';
import {StyleSheet} from 'react-native';

type Props = {
  item: CollectionModel;
};

const CollectionItem = ({item}: Props) => {
  const {sizes, spacing} = useAppTheme();
  const bookImages = item.books.map(book => book.image);
  const splicedBookImages = [...bookImages].splice(0, 3);

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
                  width={(sizes.collection_item_width - 10 - spacing.s * 2) / 2}
                  contentFit="contain"
                  alignSelf={'flex-start'}
                />
              </Box>
            ))}
            {bookImages.length > 3 ? (
              <Box
                width={(sizes.collection_item_width - 10 - spacing.s * 2) / 2}
                style={styles.fakeImage}
                height={70}>
                <Box
                  backgroundColor={'surfaceContainerHighest'}
                  flex={1}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <Text numberOfLines={1}>{`+${bookImages.length - 3}`}</Text>
                </Box>
              </Box>
            ) : null}
          </Row>
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

const styles = StyleSheet.create({
  fakeImage: {
    paddingHorizontal: 12,
  },
});

export default CollectionItem;
