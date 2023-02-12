import {Model, Q} from '@nozbe/watermelondb';
import {lazy, text} from '@nozbe/watermelondb/decorators';

export default class Author extends Model {
  static table = 'authors';

  static associations = {
    book_authors: {type: 'has_many', foreignKey: 'book_id'},
  };

  @text('name') name;

  @lazy
  books = this.collections
    .get('books')
    .query(Q.on('book_authors', 'author_id', this.id));
}
