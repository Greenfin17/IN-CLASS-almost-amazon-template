import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;
// const currentUserUid = firebase.auth().currentUser.uid;

// GET BOOKS
const getBooks = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => {
      const booksArray = Object.values(response.data);
      if (response.data) {
        resolve(booksArray);
      } else resolve([]);
    }).catch((error) => reject(error));
});
// DELETE BOOK
const deleteBooks = (firebaseKey, userId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => getBooks(userId).then((booksArray) => resolve(booksArray))
      .catch((error) => reject(error)));
});

const deleteBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => {
      resolve(response);
    })
    .catch((error) => reject(error));
});

// CREATE BOOK
const createBooks = (bookObj, userId) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, body)
        .then(() => {
          getBooks(userId).then((booksArray) => resolve(booksArray));
        });
    }).catch((error) => reject(error));
});

// GET BOOKS ON SALE
const getSaleBooks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json?orderBy="sale"&equalTo=true`)
    .then((response) => {
      const saleBooksArray = Object.values(response.data);
      if (response.data) {
        resolve(saleBooksArray);
      } else resolve([]);
    }).catch((error) => reject(error));
});

// GET BOOKS BY AUTHOR
const getBooksByAuthor = (authorId) => new Promise((resolve, reject) => {
  console.warn(authorId);
  axios.get(`${dbUrl}/books.json?orderBy="author_id"&equalTo="${authorId}"`)
    .then((response) => {
      const booksArray = Object.values(response.data);
      if (response.data) {
        resolve(booksArray);
      } else {
        resolve([]);
      }
    }).catch((error) => reject(error));
});

// GET SINGLE BOOK
const getSingleBook = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// UPDATE BOOK
const updateBook = (userId, firebaseKey, bookObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/books/${firebaseKey}.json`, bookObject)
    .then(() => getBooks(userId).then((booksArr) => resolve(booksArr))
      .catch((error) => reject(error)));
});

// SEARCH BOOKS
const searchBooks = (userId, searchValue) => new Promise((resolve, reject) => {
  let filteredBooks = [];
  getBooks(userId).then((books) => {
    if (books.length) {
      filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchValue));
    }
  })
    .then(() => resolve(filteredBooks))
    .catch((error) => reject(error));
});

export {
  getBooks, deleteBooks, deleteBook, createBooks, getSaleBooks,
  getSingleBook, getBooksByAuthor, updateBook,
  searchBooks
};
