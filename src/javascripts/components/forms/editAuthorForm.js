// editAuthors.js

const editAuthorForm = (authorObj) => {
  document.querySelector('#modal-body').innerHTML = `
    <form id="submit-author-form" class="mb-4">
      <div class="form-group">
        <label for="first-name">Author First Name</label>
        <input type="text" class="form-control" id="first-name" 
          aria-describedby="authorName" placeholder="Enter Author First Name" value="${authorObj.first_name}" required>
      </div>
      <div class="form-group">
        <label for="last-name">Last Name</label>
        <input type="text" class="form-control" id="last-name" placeholder="Last Name"
          value="${authorObj.last_name}" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Email" 
          value="${authorObj.email}" required>
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="favorite" ${authorObj.favorite && 'checked'}>
        <label class="form-check-label" for="favorite">Favorite?</label>
      </div>
      <button type="submit" id="update-author--${authorObj.firebaseKey}" class="btn btn-success">Update Author</button>
    </form>`;
};

export default editAuthorForm;
