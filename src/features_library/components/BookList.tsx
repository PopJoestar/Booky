import React from 'react';
import {FlashList, FlashListProps} from '@shopify/flash-list';
import {Divider} from 'react-native-paper';
import {BaseBook} from '../../types';
import BookItem from './BookItem';

type Props<T extends BaseBook> = Omit<
  FlashListProps<T>,
  'data' | 'renderItem' | 'estimatedItemSize' | 'ItemSeparatorComponent'
> & {
  data: T[];
  onPressItem?: (book: T) => void;
};

function BookList<T extends BaseBook>({
  data,
  onPressItem,
  scrollEventThrottle = 16,
  onEndReachedThreshold = 1.5,
  ...rest
}: Props<T>) {
  const renderBook = ({item}: {item: T}) => {
    return <BookItem item={item} onPress={onPressItem} />;
  };

  return (
    <FlashList
      data={data}
      renderItem={renderBook}
      estimatedItemSize={121 + 16}
      ItemSeparatorComponent={Divider}
      scrollEventThrottle={scrollEventThrottle}
      onEndReachedThreshold={onEndReachedThreshold}
      {...rest}
    />
  );
}

export default BookList;
