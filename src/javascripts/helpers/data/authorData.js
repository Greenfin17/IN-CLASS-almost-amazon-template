import axios from 'axios';
import firebaseConfig from '../auth/apiKeys';
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
// SEARCH AUTHORS

export { getAuthors, createAuthors, deleteAuthors };
