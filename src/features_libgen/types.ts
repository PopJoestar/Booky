export interface LibgenResponse {
  totalItem: number;
  totalPages: number;
  items: BookRemote[];
}

export type SearchParams = {
  search: string;
  category: string;
  language: string;
  extension: string;
};

export interface BookRemote {
  libgenID: string;
  title: string;
  size: string;
  extension: string;
  md5: string;
  image: string;
  nbrOfPages: string;
  series: string;
  authors: string[];
  publisher: string;
  isbns: string[];
  year: string;
  language: string;
  type: string;
  description?: string;
  downloadLinks?: {host: string; link: string}[];
}

export interface GetDetailsResponse {
  title: string;
  image: string;
  authors: string[];
  publisher: string;
  isbns: string[];
  description: string;
  downloadLinks: DownloadLink[];
  year: string;
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
