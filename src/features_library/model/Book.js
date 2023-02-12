import {Model, Q} from '@nozbe/watermelondb';
import {lazy, text} from '@nozbe/watermelondb/decorators';

export default class Book extends Model {
  static table = 'books';

  static associations = {
    book_authors: {type: 'has_many', foreignKey: 'author_id'},
  };

  @text('title') title;
  @text('size') size;
  @text('extension') extension;
  @text('language') language;

  @lazy
  authors = this.collections
    .get('authors')
    .query(Q.on('book_authors', 'book_id', this.id));
}
