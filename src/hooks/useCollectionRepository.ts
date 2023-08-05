import {CollectionModel, useRealm} from '@/database';
import {useCallback} from 'react';

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

  return {createCollection};
};

export default useCollectionRepository;
