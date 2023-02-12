import {LibrarySchema} from '@/features_library';
import {appSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    LibrarySchema.BooksTableSchema,
    LibrarySchema.AuthorsTableSchema,
    LibrarySchema.BooksTableSchema,
  ],
});
