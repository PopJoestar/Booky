import {useObject} from '../database';
import {BookModel, bookModelToBook} from '../models/BookModel';

const useBookObject = (bookId: string) => {
  const response: BookModel | null = useObject('Book', bookId);

  return response ? bookModelToBook(response) : null;
};

export default useBookObject;
