import React from 'react';
import {useRoute} from '@react-navigation/native';
import {ColletionScreenRouteProp} from '@/navigation/types';
import {CollectionModel, useObject} from '@/database';
import {useNavigationOptions} from '@/hooks';
import {BookList} from '@/components';

const CollectionScreen = () => {
  const {params} = useRoute<ColletionScreenRouteProp>();

  const collection = useObject(
    CollectionModel,
    new Realm.BSON.ObjectId(params.collectionId),
  );

  useNavigationOptions({title: collection?.name});

  return (
    <BookList data={collection ? collection.books.map(book => book) : []} />
  );
};

export default CollectionScreen;
