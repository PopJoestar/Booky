import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {useTempBookStore} from '../stores/tempBookStore';
import {useBookRepository} from '@/data';
import {useTranslation} from 'react-i18next';
import {useAppTheme, useMessageDisplayer} from '@/shared/hooks';
import {FlashMessageSuccessIcon} from '@/shared/components';

const RemoteBookDetailsHeader = ({navigation}: NativeStackHeaderProps) => {
  const {colors} = useAppTheme();
  const {showMessage} = useMessageDisplayer();
  const currentBook = useTempBookStore(state => state.tempBook);
  const {getBook, addBook, removeBook} = useBookRepository();
  const {t} = useTranslation();

  const isBookInLibrary = () => {
    if (currentBook.md5 == null) {
      return false;
    }
    return getBook(currentBook.md5) != null;
  };

  const saveBook = () => {
    addBook(currentBook);

    showMessage({
      message: t('book_details:book_saved', {title: currentBook.title}),
      icon: FlashMessageSuccessIcon,
      type: 'success',
    });
  };

  const callRemoveBook = () => {
    if (currentBook.md5 == null) {
      return;
    }
    const book = getBook(currentBook.md5);
    if (book == null) {
      return;
    }
    removeBook(book);
  };
  const _isBookInLibrary = isBookInLibrary();
  return (
    <Appbar.Header>
      {navigation.canGoBack() ? (
        <Appbar.BackAction onPress={navigation.goBack} />
      ) : null}
      <Appbar.Content title="" />
      <Appbar.Action
        icon={_isBookInLibrary ? 'bookmark' : 'bookmark-outline'}
        color={_isBookInLibrary ? colors.tertiary : undefined}
        onPress={_isBookInLibrary ? callRemoveBook : saveBook}
      />
    </Appbar.Header>
  );
};

export default RemoteBookDetailsHeader;
