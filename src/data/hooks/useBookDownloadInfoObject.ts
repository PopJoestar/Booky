import {useObject} from '../database';
import {BookDownloadInfoModel} from '../models/BookDownloadInfoModel';

const useBookDownloadInfoObject = (bookMD5: string) => {
  const response: BookDownloadInfoModel | null = useObject(
    'BookDownloadInfo',
    bookMD5,
  );

  return response;
};

export default useBookDownloadInfoObject;
