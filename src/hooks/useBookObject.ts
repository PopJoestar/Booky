import {BookModel, useObject} from '@/database';

const useBookObject = (bookId: string) => {
  const response = useObject(BookModel, bookId);

  return response;
};

export default useBookObject;
