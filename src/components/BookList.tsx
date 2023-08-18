import {BookModel} from '@/database/models/BookModel';
import {useAppTheme} from '@/hooks';
import {FlashList, ListRenderItem} from '@shopify/flash-list';
import React from 'react';
import {Divider} from 'react-native-paper';
import BookItem from './BookItem';

type Props = {
  data: BookModel[];
};

const BookList = ({data}: Props) => {
  const {sizes} = useAppTheme();

  const renderBook: ListRenderItem<BookModel> = ({item}) => {
    return <BookItem item={item} />;
  };
  return (
    <FlashList
      data={data}
      renderItem={renderBook}
      estimatedItemSize={sizes.book_card_estimated_height}
      ItemSeparatorComponent={Divider}
      keyExtractor={keyExtractor}
    />
  );
};

const keyExtractor = (item: BookModel) => item.md5!;

export default BookList;
