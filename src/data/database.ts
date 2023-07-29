import {createRealmContext} from '@realm/react';
import {BookModel, DownloadLinkModel} from './models/BookModel';
import {SettingsModel} from './models/SettingsModel';

export const {useQuery, useRealm, useObject, RealmProvider} =
  createRealmContext({
    schema: [BookModel, DownloadLinkModel, SettingsModel],
  });