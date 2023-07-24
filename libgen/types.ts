export type LibgenBookLanguage = 'ALL' | 'fr' | 'en' | 'de' | 'it';
export type LibgenBookExtension = 'ALL' | 'pdf' | 'epub' | 'djvu';
export type LibgenBookCategory = 'FICTION' | 'NON_FICTION';

export interface LibgenSearchBooksResponse {
  totalItem: number;
  totalPages: number;
  items: LibgenBook[];
}

export type LibgenSearchBooksParams = {
  query: string;
  category: LibgenBookCategory;
  language: LibgenBookLanguage;
  extension: LibgenBookExtension;
  page?: number;
};

export interface LibgenBook {
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
  downloadLinks?: DownloadLink[];
  details_url?: string;
}

export interface LibgenBookDetails {
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
