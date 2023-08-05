import {BookModel} from './BookModel';

export class CollectionModel extends Realm.Object<CollectionModel> {
  id!: Realm.BSON.ObjectId;
  name!: string;
  books!: Realm.List<BookModel>;
  createdAt!: Date;

  static schema = {
    name: 'Collection',
    properties: {
      id: 'objectId',
      name: 'string',
      createdAt: 'date',
      books: {type: 'list', default: [], objectType: 'Book'},
    },
    primaryKey: 'id',
  };
}
