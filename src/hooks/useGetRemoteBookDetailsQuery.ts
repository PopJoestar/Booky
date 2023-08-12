import {Book} from '@/interfaces/Book';
import {BookFinder} from '@/services';
import useSWR, {mutate} from 'swr';

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
      errorRetryCount: 2,
      onError: e => {
        console.log(e);
      },
    },
  );

  const refetch = () =>
    mutate(bookDetailsUrl, undefined, {
      rollbackOnError: true,
      revalidate: true,
    });

  return {...response, refetch};
};

export default useGetRemoteBookDetailsQuery;
