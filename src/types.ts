export interface Root {
  totalItem: number;
  totalPages: number;
  items: BookRemote[];
}

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
