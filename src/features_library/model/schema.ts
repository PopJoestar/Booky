import {tableSchema} from '@nozbe/watermelondb/Schema';

export const BooksTableSchema = tableSchema({
  name: 'books',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'size', type: 'string'},
    {name: 'extension', type: 'string'},
    {name: 'language', type: 'string'},
  ],
});

export const AuthorsTableSchema = tableSchema({
  name: 'authors',
  columns: [{name: 'name', type: 'string'}],
});

export const BookAuthorTableSchema = tableSchema({
  name: 'book_authors',
  columns: [
    {name: 'book_id', type: 'string'},
    {name: 'author_id', type: 'string'},
  ],
});
