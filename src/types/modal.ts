import {BookModel} from '@/database';
import {PrimaryKey} from 'realm';

export type Modals = {
  add_to_collection: {
    book: BookModel;
  };
  test: undefined;
  caca: {be: string};
  rename_collection: {collectionId: PrimaryKey};
  remove_collection: {collectionId: PrimaryKey};
  create_collection: undefined;
  remove_book_from_library: {bookId: PrimaryKey};
  remove_file: {filePath: string};
  remove_book_everywhere: {bookId: PrimaryKey};
  download_book: {bookId: PrimaryKey};
  add_book_to_collection: {bookId: PrimaryKey};
};
