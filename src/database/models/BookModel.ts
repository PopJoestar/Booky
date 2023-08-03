import {Book} from '@/interfaces/Book';
import {Realm} from '@realm/react';

export class DownloadLinkModel extends Realm.Object<DownloadLinkModel> {
  static schema = {
    name: 'DownloadLink',
    properties: {
      host: 'string',
      link: 'string',
    },
  };
}

export class BookModel extends Realm.Object<BookModel> {
  _id!: Realm.BSON.ObjectId;

  createdAt!: Date;
  isRead!: boolean;
  filePath!: string;

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
  downloadLinks?: {host: string; link: string}[];
  details_url?: string;

  static generate(book: Book) {
    return {
      _id: new Realm.BSON.ObjectId(),
      createdAt: new Date(),
      isRead: false,
      ...book,
    };
  }

  static schema = {
    name: 'Book',
    properties: {
      _id: 'objectId',
      createdAt: 'date',
      title: 'string',
      size: 'string',
      extension: 'string',
      authors: 'string[]',
      isRead: {type: 'bool', default: false},
      filePath: {type: 'string', default: ''},
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
    primaryKey: 'md5',
  };
}

export const bookModelToBook = (bookModel: BookModel): Book => {
  return {
    title: bookModel.title,
    size: bookModel.size,
    extension: bookModel.extension,
    authors: bookModel.authors,
    language: bookModel.language,
    description: bookModel.description,
    image: bookModel.image,
    downloadLinks: bookModel.downloadLinks,
    isbns: bookModel.isbns,
    md5: bookModel.md5,
    filePath: bookModel.filePath,
  };
};
