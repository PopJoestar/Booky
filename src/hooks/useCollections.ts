import {CollectionModel, useQuery} from '@/database';

const useCollections = () => {
  const collections: Realm.Results<CollectionModel> = useQuery(CollectionModel);

  return collections.map(collection => collection);
};

export default useCollections;
