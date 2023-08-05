import {createRealmContext} from '@realm/react';
import {BookModel, DownloadLinkModel} from './models/BookModel';
import {SettingsModel} from './models/SettingsModel';
import {BookDownloadInfoModel} from './models/BookDownloadInfoModel';
import {CollectionBook, CollectionModel} from './models/CollectionModel';

export const {useQuery, useRealm, useObject, RealmProvider} =
  createRealmContext({
    schema: [
      BookModel,
      DownloadLinkModel,
      SettingsModel,
      BookDownloadInfoModel,
      CollectionModel,
      CollectionBook,
    ],
  });
