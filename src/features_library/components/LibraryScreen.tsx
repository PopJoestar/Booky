import React from 'react';
import Header from './Header';
import {useBookRepository, useSettings} from '@/data';

import {openFileWithThirdPartyApp} from '@/shared/utils/files';
import {FlashList} from '@shopify/flash-list';
import BookItem from './BookItem';
import {useAppTheme} from '@/shared/hooks';
import {Divider} from 'react-native-paper';

const LibraryScreen = () => {
  const {sizes} = useAppTheme();

  const {books} = useBookRepository();
  useSettings();

  const renderBook = ({item}) => {
    return (
      <BookItem
        item={item}
        onPress={async book => {
          if (book.filePath === '') {
            return;
          }
          await openFileWithThirdPartyApp(book.filePath);
        }}
        showSaved={false}
      />
    );
  };

  return (
    <>
      <Header />
      <FlashList
        data={books}
        renderItem={renderBook}
        estimatedItemSize={sizes.book_card_estimated_height}
        ItemSeparatorComponent={Divider}
      />
    </>
  );
};

export default LibraryScreen;
