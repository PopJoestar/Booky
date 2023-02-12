import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import migrations from './migrations';
import {Book, Author, BookAuthor} from '@/features_library';

const adapter = new SQLiteAdapter({
  schema,
  migrations,

  onSetUpError: error => {
    console.log(error);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Book, Author, BookAuthor],
});
