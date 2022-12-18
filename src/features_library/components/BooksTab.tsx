import React from 'react';
import {Box, Image, Row, Text, TouchableRipple} from '../../shared/components';
import {BookRemote} from '../../types';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import mockData from '../data.json';
import {Divider} from 'react-native-paper';
import {useAppTheme} from '../../shared/hooks';
import {useNavigation} from '@react-navigation/native';
import {useCurrentBookStore} from '../../features_book_details';

const BooksTab = () => {
  const {sizes} = useAppTheme();
  const navigation = useNavigation();

  const setCurrentBook = useCurrentBookStore(state => state.setCurrentBook);

  const renderBook: ListRenderItem<BookRemote> = ({item}) => {
    return (
      <TouchableRipple
        backgroundColor="surface"
        paddingLeft="m"
        paddingVertical="m"
        onPress={() => {
          setCurrentBook(item);
          navigation.navigate('book_details', {md5: item.md5});
        }}
        paddingRight="l">
        <Row>
          <Image
            source={{uri: item.image}}
            height={sizes.book_card_image_height}
            width={sizes.book_card_image_width}
          />
          <Box flex={1} paddingLeft="m">
            <Text variant="bodyLarge" color="onSurface" numberOfLines={2}>
              {item.title}
            </Text>
            <Text
              variant="bodySmall"
              color="onSurfaceVariant"
              numberOfLines={1}>
              {item.authors.join(', ')}
            </Text>
            <Text
              variant="bodySmall"
              color="onSurface"
              numberOfLines={1}
              opacity={0.6}>
              {[item.size, item.extension].join(' \u2022 ')}
            </Text>
          </Box>
        </Row>
      </TouchableRipple>
    );
  };

  return (
    <FlashList
      data={mockData.items}
      renderItem={renderBook}
      estimatedItemSize={121 + 16}
      ItemSeparatorComponent={Divider}
    />
  );
};

export default BooksTab;
