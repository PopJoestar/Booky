import {useSearchStore} from '../states';
import shallow from 'zustand/shallow';
import useSWRInfinite from 'swr/infinite';
import {useCallback, useEffect} from 'react';
import {SearchParams, SearchResponse} from '../../features_libgen/types';
import {Libgen} from '../../features_libgen';

function useSearch() {
  const {query, category, extension, language} = useSearchStore(
    state => ({
      category: state.category,
      extension: state.extension,
      language: state.language,
      query: state.query,
    }),
    shallow,
  );
  const updateQuery = useSearchStore(state => state.updateQuery);

  const getKey = useCallback(
    (
      pageIndex: number,
      previousPageData: SearchResponse,
    ): SearchParams | null => {
      if (
        (previousPageData && previousPageData.items.length === 0) ||
        query === ''
      ) {
        return null;
      }

      return {
        page: pageIndex + 1,
        query,
        language,
        extension,
        category,
      };
    },
    [category, extension, language, query],
  );

  const {data, size, isLoading, setSize, error, isValidating} = useSWRInfinite(
    getKey,
    arg =>
      Libgen.search({
        query: arg.query,
        category: arg.category,
        language: arg.language,
        extension: arg.extension,
        page: arg.page,
      }),
  );

  const next = () => {
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
  };
}

export default useSearch;
