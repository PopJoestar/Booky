import {createRealmContext} from '@realm/react';
import {BookModel, DownloadLinkModel} from './models/BookModel';

export const {useQuery, useRealm, useObject, RealmProvider} =
  createRealmContext({
    schema: [BookModel, DownloadLinkModel],
  });
