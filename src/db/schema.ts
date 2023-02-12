import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'books',
      columns: [
        {name: 'title', type: 'string'},
        {name: 'size', type: 'string'},
        {name: 'extension', type: 'string'},
        {name: 'language', type: 'string'},
      ],
    }),
    tableSchema({
      name: 'authors',
      columns: [{name: 'name', type: 'string'}],
    }),
    tableSchema({
      name: 'book_authors',
      columns: [
        {name: 'book_id', type: 'string'},
        {name: 'author_id', type: 'string'},
      ],
    }),
  ],
});
