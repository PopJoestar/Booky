import {CollectionModel, useQuery} from '@/database';

const useCollections = () => {
  const collections: Realm.Results<CollectionModel> = useQuery(CollectionModel);

  return collections.sorted('createdAt', true).map(collection => collection);
};

export default useCollections;
