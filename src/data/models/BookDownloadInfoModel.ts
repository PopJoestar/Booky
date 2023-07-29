export class BookDownloadInfoModel extends Realm.Object<BookDownloadInfoModel> {
  url!: string;
  fileUri!: string;
  bookMd5!: string;

  static schema = {
    name: 'BookDownloadInfo',
    properties: {
      url: 'string',
      fileUri: 'string',
      bookMd5: 'string',
    },
    primaryKey: 'bookMd5',
  };
}
