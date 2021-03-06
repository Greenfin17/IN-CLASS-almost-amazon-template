// authorBooksData.js

import { deleteBook, getBooksByAuthor } from './bookData';
import { deleteAuthors } from './authorData';

const deleteAuthorBooks = (authorId, userId) => new Promise((resolve, reject) => {
  getBooksByAuthor(authorId).then((booksArr) => {
    const deletedBooks = booksArr.map((book) => deleteBook(book.firebaseKey));
    console.warn(deletedBooks);
    Promise.all(deletedBooks).then(() => resolve(deleteAuthors(authorId, userId)));
  }).catch((error) => reject(error));
});

export default deleteAuthorBooks;
