import {Book} from '@/interfaces/Book';
import {BookFinder} from '@/services';
import useSWR from 'swr';

const useGetRemoteBookDetailsQuery = ({
  bookDetailsUrl,
  onSuccess,
}: {
  bookDetailsUrl: string;
  onSuccess?: (data: Partial<Book>) => void;
}) => {
  const response = useSWR(
    bookDetailsUrl,
    (detailsUrl: string) => BookFinder.getBookDetails(detailsUrl),
    {
      onSuccess,
    },
  );

  return response;
};

export default useGetRemoteBookDetailsQuery;
