import {shallow} from 'zustand/shallow';
import useSWRInfinite from 'swr/infinite';
import {useCallback, useEffect} from 'react';
import {BookFinder} from '@/services';
import {SearchBooksParams, SearchBooksResponse} from '@/interfaces/Book';
import {useSearchBooksOptionsStore} from '@/stores';
import {SEARCH_OPTIONS} from '@/constants/searchOptions';

type Options = {
  onError: (error: unknown) => void;
};

function useSearchBooksQuery(options?: Options) {
  const {query, category, extension, language} = useSearchBooksOptionsStore(
    state => ({
      category: state.category,
      extension: state.extension,
      language: state.language,
      query: state.query,
    }),
    shallow,
  );
  const updateQuery = useSearchBooksOptionsStore(state => state.updateQuery);

  const getKey = useCallback(
    (
      pageIndex: number,
      previousPageData: SearchBooksResponse,
    ): SearchBooksParams | null => {
      if (
        (previousPageData && previousPageData.items.length === 0) ||
        query === ''
      ) {
        return null;
      }

      return {
        page: pageIndex + 1,
        query: query.trim().toLowerCase(),
        language: SEARCH_OPTIONS.language[language].value,
        extension: SEARCH_OPTIONS.extension[extension].value,
        category: SEARCH_OPTIONS.category[category].value,
      };
    },
    [category, extension, language, query],
  );

  const {data, size, isLoading, setSize, error, isValidating, mutate} =
    useSWRInfinite(
      getKey,
      arg =>
        BookFinder.search({
          query: arg.query.trim().toLowerCase(),
          category: arg.category,
          language: arg.language,
          extension: arg.extension,
          page: arg.page ?? 1,
        }),
      {
        shouldRetryOnError: false,
        onError: options?.onError,
      },
    );

  const next = () => {
    if (error || isLoading || isValidating) {
      return;
    }
    if (data && data.length > 0 && data[0].totalPages === size) {
      return;
    }
    setSize(size + 1);
  };

  useEffect(() => {
    return () => {
      updateQuery('');
    };
  }, [updateQuery]);

  const refetchCurrent = () => {
    mutate(data, {revalidate: true, rollbackOnError: true});
  };
  return {
    data: data === undefined ? [] : data.flatMap(d => d.items),
    isLoading: isValidating && size > 1,
    isFirstLoading: size === 1 && isLoading,
    next,
    error,
    isEnd:
      data === undefined || data.length < 1
        ? false
        : data[0].totalPages === size,
    isNoResult:
      data !== undefined && data.length === 1 && data[0].totalItem === 0,
    query,
    mutate,
    refetchCurrent,
    isValidating,
    page: size,
  };
}

export default useSearchBooksQuery;
