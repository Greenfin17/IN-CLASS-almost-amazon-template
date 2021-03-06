import 'firebase/auth';
import addBookForm from '../components/forms/addBookForm';
import addAuthorForm from '../components/forms/addAuthorForm';
import {
  createBooks, deleteBooks, getSingleBook, updateBook
} from '../helpers/data/bookData';
import {
  createAuthors,
  getSingleAuthor, updateAuthor
} from '../helpers/data/authorData';
import deleteAuthorBooks from '../helpers/data/authorBooksData';
import { showBooks } from '../components/books';
import { showAuthors } from '../components/authors';
import formModal from '../components/forms/formModal';
import editBookForm from '../components/forms/editBookForm';
import editAuthorForm from '../components/forms/editAuthorForm';

const domEvents = (userId) => {
  document.querySelector('body').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING A BOOK
    if (e.target.id.includes('delete-book')) {
      e.preventDefault();
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const firebaseKey = e.target.id.split('--')[1];
        deleteBooks(firebaseKey, userId).then((booksArray) => showBooks(booksArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING A BOOK
    if (e.target.id.includes('add-book-btn')) {
      addBookForm(userId);
    }

    // CLICK EVENT FOR SUBMITTING FORM FOR ADDING A BOOK
    if (e.target.id.includes('submit-book')) {
      console.warn('CLICKED SUBMIT BOOK', e.target.id);
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
        uid: userId
      };

      createBooks(bookObject, userId).then((response) => showBooks(response));
    }

    // CLICK EVENT FOR SHOWING MODAL FORM FOR EDITING A BOOK
    if (e.target.id.includes('edit-book-btn')) {
      formModal('update Book');
      const firebaseKey = e.target.id.split('--')[1];
      console.warn('CLICKED EDIT BOOK', firebaseKey);
      getSingleBook(firebaseKey).then((bookObject) => editBookForm(userId, bookObject));
    }

    // CLICK EVENT FOR EDITING A BOOK
    if (e.target.id.includes('update-book')) {
      const firebaseKey = e.target.id.split('--')[1];
      e.preventDefault();
      const bookObject = {
        title: document.querySelector('#title').value,
        image: document.querySelector('#image').value,
        price: document.querySelector('#price').value,
        sale: document.querySelector('#sale').checked,
        author_id: document.querySelector('#author').value,
      };
      updateBook(userId, firebaseKey, bookObject).then((booksArr) => {
        showBooks(booksArr);
      });
      $('#formModal').modal('toggle');
    }

    // ADD CLICK EVENT FOR DELETING AN AUTHOR
    if (e.target.id.includes('delete-author')) {
      e.preventDefault();
      if (window.confirm('Want to delete?')) {
        console.warn('CLICKED DELETE BOOK', e.target.id);
        const firebaseKey = e.target.id.split('--')[1];
        deleteAuthorBooks(firebaseKey, userId)
          .then((authorsArray) => {
            if (authorsArray.length) {
              showAuthors(authorsArray);
            } else {
              console.warn('No Authors in Delete Author');
            }
          });
      }
    }
    // ADD CLICK EVENT FOR SHOWING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('add-author-btn')) {
      addAuthorForm();
    }
    // ADD CLICK EVENT FOR SUBMITTING FORM FOR ADDING AN AUTHOR
    if (e.target.id.includes('submit-author')) {
      console.warn('CLICKED SUBMIT AUTHOR', e.target.id);
      e.preventDefault();
      const authorObject = {
        first_name: document.querySelector('#first-name').value,
        last_name: document.querySelector('#last-name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        uid: userId
      };
      createAuthors(authorObject, userId).then((authorsArr) => showAuthors(authorsArr));
    }

    // CLICK EVENT FOR SHOWING MODAL FORM FOR EDITING AN AUTHOR
    if (e.target.id.includes('edit-author-btn')) {
      formModal('update Author');
      const firebaseKey = e.target.id.split('--')[1];
      console.warn('CLICKED EDIT AUTHOR', firebaseKey);
      getSingleAuthor(firebaseKey).then((authorObj) => editAuthorForm(authorObj));
    }
    // ADD CLICK EVENT FOR EDITING AN AUTHOR
    if (e.target.id.includes('update-author')) {
      const firebaseKey = e.target.id.split('--')[1];
      e.preventDefault();
      const authorObject = {
        first_name: document.querySelector('#first-name').value,
        last_name: document.querySelector('#last-name').value,
        email: document.querySelector('#email').value,
        favorite: document.querySelector('#favorite').checked,
        uid: userId
      };
      updateAuthor(userId, firebaseKey, authorObject).then((authorArr) => {
        showAuthors(authorArr);
      });
      $('#formModal').modal('toggle');
    }
  });
};

export default domEvents;
