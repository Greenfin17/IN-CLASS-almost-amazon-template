import { getBooks } from '../../helpers/data/bookData';

const selectBook = (bookObj = null) => {
  let domString = `<label for="book">Select a Book</label>
    <select class="form-control" id="book" required>
    <option value="">Select a Book</option>`;

  getBooks().then((booksArray) => {
    booksArray.forEach((book) => {
      domString += `<option value="${book.firebaseKey}">${book.title}</option>`;
    });

    domString += '</select>';

    document.querySelector('#select-book').innerHTML = domString;
  });
};

export default selectBook;
