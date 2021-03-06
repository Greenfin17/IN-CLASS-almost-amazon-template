import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
// API CALLS FOR BOOKS

const dbUrl = firebaseConfig.databaseURL;

// GET BOOKS
const getBooks = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/books.json`)
    .then((response) => {
      const booksArray = Object.values(response.data);
      if (response.data) {
        resolve(booksArray);
      } else resolve([]);
    }).catch((error) => reject(error));
});
// DELETE BOOK
const deleteBooks = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/books/${firebaseKey}.json`)
    .then(() => getBooks().then((booksArray) => resolve(booksArray))
      .catch((error) => reject(error)));
});

// CREATE BOOK
const createBooks = (bookObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/books.json`, bookObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/books/${response.data.name}.json`, body)
        .then(() => {
          getBooks().then((booksArray) => resolve(booksArray));
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

// UPDATE BOOK
// SEARCH BOOKS
export {
  getBooks, deleteBooks, createBooks, getSaleBooks
};
