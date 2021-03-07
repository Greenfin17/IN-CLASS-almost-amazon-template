// authorBooksData.js

import { deleteBook, getBooksByAuthor } from './bookData';
import { deleteAuthors, getSingleAuthor } from './authorData';

const deleteAuthorBooks = (authorId, userId) => new Promise((resolve, reject) => {
  getBooksByAuthor(authorId).then((booksArr) => {
    const deletedBooks = booksArr.map((book) => deleteBook(book.firebaseKey));
    Promise.all(deletedBooks).then(() => resolve(deleteAuthors(authorId, userId)));
  }).catch((error) => reject(error));
});

const authorBookInfo = (authorId) => new Promise((resolve, reject) => {
  const author = getSingleAuthor(authorId);
  const authorBooks = getBooksByAuthor(authorId);

  Promise.all([author, authorBooks])
    .then(([authorResponse, authorBooksResponse]) => resolve(
      { author: authorResponse, books: authorBooksResponse }
    ))
    .catch((error) => reject(error));
});

export { deleteAuthorBooks, authorBookInfo };
