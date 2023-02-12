import {Model} from '@nozbe/watermelondb';
import {immutableRelation} from '@nozbe/watermelondb/decorators';

export default class BookAuthor extends Model {
  static table = 'book_authors';
  static associations = {
    books: {type: 'belongs_to', key: 'book_id'},
    authors: {type: 'belongs_to', key: 'author_id'},
  };

  @immutableRelation('books', 'book_id') book;
  @immutableRelation('authors', 'author_id') author;
}
