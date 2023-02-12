import {BookRemote} from '@/features_libgen/types';
import {createRealmContext, Realm} from '@realm/react';

class DownloadLink extends Realm.Object<DownloadLink> {
  static schema = {
    name: 'DownloadLink',
    properties: {
      host: 'string',
      link: 'string?',
    },
  };
}

export class Book extends Realm.Object<Book> implements BookRemote {
  _id!: Realm.BSON.ObjectId;
  createdAt!: Date;

  isRead!: boolean;
  title!: string;
  size!: string;
  extension!: string;
  authors!: string[];
  language!: string;
  isbns?: string[];
  year?: string;
  image?: string;
  nbrOfPages?: string;
  series?: string;
  libgenID?: string;
  md5?: string;
  publisher?: string;
  description?: string;
  downloadLinks?: {host: string; link?: string}[];
  details_url?: string;

  static generate(book: BookRemote) {
    return {
      _id: new Realm.BSON.ObjectId(),
      createdAt: new Date(),
      isRead: false,
      ...book,
    };
  }

  static schema = {
    name: 'Book',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      createdAt: 'date',
      title: 'string',
      size: 'string',
      extension: 'string',
      authors: 'string[]',
      isRead: {type: 'bool', default: false},
      language: 'string?',
      isbns: {type: 'string[]', default: []},
      year: 'string?',
      image: 'string?',
      nbrOfPages: 'string?',
      series: 'string?',
      libgenID: 'string?',
      md5: 'string?',
      publisher: 'string?',
      description: 'string?',
      downloadLinks: {type: 'list', default: [], objectType: 'DownloadLink'},
      details_url: 'string?',
    },
  };
}

export const {
  RealmProvider: BooksProvider,
  useRealm: useBooksRealm,
  useQuery: useBooks,
} = createRealmContext({
  schema: [Book, DownloadLink],
});
