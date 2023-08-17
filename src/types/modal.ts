import {BookModel} from '@/database';
import {PrimaryKey} from 'realm';

export type Modals = {
  add_to_collection: {
    book: BookModel;
  };
  test: undefined;
  caca: {be: string};
  rename_collection: {collectionId: PrimaryKey};
};
