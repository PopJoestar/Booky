import {BookModel, DownloadLinkModel} from '@/models';
import {createRealmContext} from '@realm/react';

export const {useQuery, useRealm, useObject, RealmProvider} =
  createRealmContext({
    schema: [BookModel, DownloadLinkModel],
  });
