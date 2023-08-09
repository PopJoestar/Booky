import {CollectionModel, useRealm} from '@/database';
import {useCallback} from 'react';
import {PrimaryKey} from 'realm';

const useCollectionRepository = () => {
  const realm = useRealm();

  const createCollection = useCallback(
    (name: string) => {
      realm.write(() => {
        realm.create(CollectionModel, {
          name,
          id: new Realm.BSON.ObjectId(),
          createdAt: new Date(),
        });
      });

      return true;
    },
    [realm],
  );

  const getColletion = useCallback(
    (collectionId: PrimaryKey) => {
      const response = realm.objectForPrimaryKey(CollectionModel, collectionId);

      if (response == null) {
        return null;
      }

      return response;
    },
    [realm],
  );

  const removeCollection = useCallback(
    (collectionId: PrimaryKey) => {
      const collection = getColletion(collectionId);

      if (collection == null) {
        return;
      }
      realm.write(() => {
        realm.delete(collection);
      });
    },
    [getColletion, realm],
  );

  return {createCollection, removeCollection};
};

export default useCollectionRepository;
