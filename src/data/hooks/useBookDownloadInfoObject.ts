import {useObject} from '../database';
import {BookDownloadInfoModel} from '../models/BookDownloadInfoModel';

const useBookDownloadInfoObject = (bookMD5: string) => {
  const response = useObject(BookDownloadInfoModel, bookMD5);

  return response;
};

export default useBookDownloadInfoObject;
