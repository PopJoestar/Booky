import {BookModel, DownloadLinkModel} from '@/features_library';
import {createRealmContext} from '@realm/react';

export const {useQuery, useRealm, useObject, RealmProvider} =
  createRealmContext({
    schema: [BookModel, DownloadLinkModel],
  });
