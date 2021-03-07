import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
import { deleteBooks, getBooksByAuthor } from './bookData';
// API CALLS FOR AUTHORS

const dbUrl = firebaseConfig.databaseURL;

// GET AUTHORS
const getAuthors = (userId) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="uid"&equalTo="${userId}"`)
    .then((response) => {
      const authorArray = Object.values(response.data);
      if (response.data) {
        resolve(authorArray);
      } else resolve([]);
    }).catch((error) => reject(error));
});

// GET SINGLE AUTHOR
const getSingleAuthor = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// GET FAVORITE AUTHORS
const getFavoriteAuthors = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/authors.json?orderBy="favorite"&equalTo=true`)
    .then((response) => {
      const favoriteAuthorsArray = Object.values(response.data);
      if (response.data) {
        resolve(favoriteAuthorsArray);
      } else resolve([]);
    }).catch((error) => reject(error));
});

// DELETE BOOKS BY AUTHOR
const deleteBooksByAuthor = (firebaseKey, userId) => {
  getBooksByAuthor(firebaseKey).then((books) => {
    books.forEach((book) => {
      if (book.uid === userId) {
        deleteBooks(book.firebaseKey, userId);
      }
    });
  });
};

// DELETE AUTHOR
const deleteAuthors = (firebaseKey, userId) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/authors/${firebaseKey}.json`)
    .then(() => getAuthors(userId).then((authorsArray) => resolve(authorsArray)))
    .catch((error) => reject(error));
});

// CREATE AUTHOR
const createAuthors = (authorObj, userId) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/authors.json`, authorObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/authors/${response.data.name}.json`, body)
        .then(() => {
          getAuthors(userId).then((booksArray) => resolve(booksArray));
        });
    }).catch((error) => reject(error));
});
// UPDATE AUTHOR
const updateAuthor = (userId, firebaseKey, authorObject) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/authors/${firebaseKey}.json`, authorObject)
    .then(() => getAuthors(userId).then((authorArr) => resolve(authorArr))
      .catch((error) => reject(error)));
});
// SEARCH AUTHORS

export {
  getAuthors, getSingleAuthor,
  getFavoriteAuthors,
  createAuthors, deleteAuthors,
  updateAuthor, deleteBooksByAuthor
};
