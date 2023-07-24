export interface Book {
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
  filePath: string;
}

export interface DownloadLink {
  host: string;
  link: string;
}

export type BookLanguage = 'ALL' | 'fr' | 'en' | 'de' | 'it';
export type BookExtension = 'ALL' | 'pdf' | 'epub' | 'djvu';
export type BookCategory = 'FICTION' | 'NON_FICTION';

export interface BookFinder {
  search({
    query,
    category,
    language,
    extension,
    page,
  }: {
    query: string;
    category: BookCategory;
    language: BookLanguage;
    extension: BookExtension;
    page: number;
  }): Promise<SearchBooksResponse>;

  getBookDetails(bookDetailUrl: string): Promise<Partial<Book>>;
}

export interface SearchBooksResponse {
  totalItem: number;
  totalPages: number;
  items: Book[];
}

export interface SearchBooksParams {
  query: string;
  category: BookCategory;
  language: BookLanguage;
  extension: BookExtension;
  page: number;
}
