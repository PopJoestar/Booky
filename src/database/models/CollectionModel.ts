import {BookModel} from './BookModel';

export class CollectionModel extends Realm.Object<CollectionModel> {
  name!: string;
  books!: Realm.Results<BookModel>;

  static schema = {
    name: 'Collections',
    properties: {
      name: 'string',
      books: {
        type: 'linkingObjects',
        objectType: 'Book',
        property: 'collections',
      },
    },
  };
}
