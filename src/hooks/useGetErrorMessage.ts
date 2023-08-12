import {HostError, HttpError} from '@/utils/errors';
import {useTranslation} from 'react-i18next';

const useGetErrorMessage = () => {
  const {t} = useTranslation();
  const getMessage = (
    error: unknown,
  ): {title: string | undefined; content: string} => {
    if (error instanceof HostError) {
      return {
        title: t('error:host.title'),
        content: t('error:host.body', {hostname: error.hostname}),
      };
    }

    if (error instanceof HttpError) {
      switch (error.code) {
        case 'CONNECTION_ERROR':
          return {
            title: t('error:connection_error.title'),
            content: t('error:connection_error.body'),
          };

        case 'TIMEOUT_ERROR':
          return {
            title: t('error:timeout_error.title'),
            content: t('error:timeout_error.body'),
          };
      }
    }

    return {
      title: undefined,
      content: error instanceof Error ? error.message : JSON.stringify(error),
    };
  };

  return getMessage;
};

export default useGetErrorMessage;
