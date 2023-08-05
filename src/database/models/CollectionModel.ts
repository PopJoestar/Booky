import {BookModel} from './BookModel';

export class CollectionBook extends Realm.Object<CollectionBook> {
  static schema = {
    name: 'CollectionBook',
    properties: {
      id: 'string',
      image: 'string?',
    },
  };
}
export class CollectionModel extends Realm.Object<CollectionModel> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  books!: Realm.List<BookModel>;
  createdAt!: Date;

  static schema = {
    name: 'Collection',
    properties: {
      _id: 'objectId',
      name: 'string',
      createdAt: 'date',
      books: {type: 'list', default: [], objectType: 'CollectionBook'},
    },
  };
}
