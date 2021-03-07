import firebase from 'firebase/app';
import 'firebase/auth';
import signOut from '../helpers/auth/signOut';
import { getAuthors, getFavoriteAuthors } from '../helpers/data/authorData';
import { showBooks, emptyBooks } from '../components/books';
import { getBooks, getSaleBooks } from '../helpers/data/bookData';
import { emptyAuthors, showAuthors } from '../components/authors';

// navigation events
const navigationEvents = (userId) => {
  // LOGOUT BUTTON
  document.querySelector('#logout-button')
    .addEventListener('click', signOut);

  // BOOKS ON SALE
  document.querySelector('#sale-books').addEventListener('click', () => {
    console.warn('Sale Books');
    getSaleBooks(userId).then((books) => {
      showBooks(books);
    });
  });

  // ALL BOOKS
  document.querySelector('#all-books').addEventListener('click', () => {
    console.warn('Clicked All Books');
    console.warn(firebase.auth().currentUser.uid);
    getBooks(userId).then((books) => {
      if (books.length) {
        showBooks(books);
      } else {
        emptyBooks();
      }
    });
  });

  // SEARCH
  document.querySelector('#search').addEventListener('keyup', (e) => {
    const searchValue = document.querySelector('#search').value.toLowerCase();
    console.warn(searchValue);

    // WHEN THE USER PRESSES ENTER, MAKE THE API CALL AND CLEAR THE INPUT
    if (e.keyCode === 13) {
      // MAKE A CALL TO THE API TO FILTER ON THE BOOKS
      // IF THE SEARCH DOESN'T RETURN ANYTHING, SHOW THE EMPTY STORE
      // OTHERWISE SHOW THE STORE

      document.querySelector('#search').value = '';
    }
  });

  // FIXME: STUDENTS Create an event listener for the Authors
  // 1. When a user clicks the authors link, make a call to firebase to get all authors
  // 2. Convert the response to an array because that is what the makeAuthors function is expecting
  // 3. If the array is empty because there are no authors, make sure to use the emptyAuthor function
  document.querySelector('#authors').addEventListener('click', () => {
    emptyAuthors();
    console.warn('All Authors');
    getAuthors(userId).then((authors) => {
      if (authors.length) {
        showAuthors(authors);
      } else {
        emptyAuthors();
      }
    });
  });

  document.querySelector('#favorite-authors').addEventListener('click', () => {
    emptyAuthors();
    console.warn('Favorite Authors');
    getFavoriteAuthors(userId).then((authors) => {
      if (authors.length) {
        showAuthors(authors);
      } else {
        emptyAuthors();
      }
    });
  });
};

export default navigationEvents;
