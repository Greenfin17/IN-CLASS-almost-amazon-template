import { getAuthors } from '../../helpers/data/authorData';

const selectAuthor = (userId, bookObj = null) => {
  let domString = `<label for="author">Select an Author</label>
    <select class="form-control" id="author" required>
    <option value="">Select an Author</option>`;

  getAuthors(userId, bookObj).then((authorsArray) => {
    console.warn(`in selectAuthor bookObj: ${bookObj}`);
    authorsArray.forEach((author) => {
      if (bookObj && author.firebaseKey === bookObj.author_id) {
        domString += `<option selected value="${author.firebaseKey}">${author.first_name} ${author.last_name}</option>`;
      } else {
        domString += `<option value="${author.firebaseKey}">${author.first_name} ${author.last_name}</option>`;
      }
    });

    domString += '</select>';

    document.querySelector('#select-author').innerHTML = domString;
  });
};

export default selectAuthor;
