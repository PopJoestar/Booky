import {
  CategoryOption,
  ExtensionOption,
  LanguageOption,
} from '../features_search/constants';

export interface SearchResponse {
  totalItem: number;
  totalPages: number;
  items: BookRemote[];
}

export type SearchParams = {
  query: string;
  category: CategoryOption;
  language: LanguageOption;
  extension: ExtensionOption;
  page?: number;
};

export type BookRemoteType = 'FICTION' | 'NON_FICTION';

export interface BookRemote {
  title: string;
  size: string;
  extension: string;
  authors: string[];
  language: string;
  isbns?: string[];
  year?: string;
  image?: string;
  nbrOfPages?: string;
  series?: string;
  libgenID?: string;
  md5?: string;
  publisher?: string;
  description?: string;
  downloadLinks?: {host: string; link?: string}[];
  type: BookRemoteType;
}

export interface GetDetailsResponse {
  title?: string;
  image?: string;
  authors?: string[];
  publisher?: string;
  isbns?: string[];
  description?: string;
  downloadLinks?: DownloadLink[];
  year?: string;
}

export interface DownloadLink {
  host: string;
  link: string;
}

export interface NativeModuleError {
  nativeStackAndroid: string[];
  userInfo: NativeModuleErrorUserInfo | null;
  message: string;
  code: string;
}

export interface NativeModuleErrorUserInfo {
  message: string;
  code: string;
  status: string | number;
}
