import React from 'react';
import {FlashList, FlashListProps} from '@shopify/flash-list';
import {Divider} from 'react-native-paper';
import {BaseBook} from '../../types';
import BookItem from './BookItem';
import {useAppTheme} from '@/shared/hooks';

type Props<T extends BaseBook> = Omit<
  FlashListProps<T>,
  'data' | 'renderItem' | 'estimatedItemSize' | 'ItemSeparatorComponent'
> & {
  data: T[];
  onPressItem?: (book: T) => void;
  showSaved?: boolean;
};

function BookList<T extends BaseBook>({
  data,
  onPressItem,
  scrollEventThrottle = 16,
  onEndReachedThreshold = 1.5,
  showSaved,
  ...rest
}: Props<T>) {
  const {sizes} = useAppTheme();
  const renderBook = ({item}: {item: T}) => {
    return <BookItem item={item} onPress={onPressItem} showSaved={showSaved} />;
  };

  return (
    <FlashList
      data={data}
      renderItem={renderBook}
      estimatedItemSize={sizes.book_card_estimated_height}
      ItemSeparatorComponent={Divider}
      scrollEventThrottle={scrollEventThrottle}
      onEndReachedThreshold={onEndReachedThreshold}
      {...rest}
    />
  );
}

export default BookList;
