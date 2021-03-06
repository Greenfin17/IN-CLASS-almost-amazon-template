import logoutButton from '../components/buttons/logoutButton';
import domBuilder from '../components/domBuilder';
import navBar from '../components/navBar';
import domEvents from '../events/domEvents';
import navigationEvents from '../events/navigationEvents';
import { getBooks } from '../helpers/data/bookData';
import { emptyBooks, showBooks } from '../components/books';

const startApp = (userObj) => {
  domBuilder(); // BUILD THE DOM
  domEvents(userObj.uid); // ADD THE EVENT LISTENTERS TO THE DOM
  navBar(); // DYNAMICALLY ADD THE NAV
  logoutButton(); // ADD THE LOGOUT BUTTON COMPONENT
  navigationEvents(userObj.uid); // ATTACH THE EVENT LISTENERS TO THE NAVBAR
  // Put all books on the DOM
  getBooks(userObj.uid).then((books) => {
    if (books.length) {
      showBooks(books);
    } else {
      emptyBooks();
    }
  });
};

export default startApp;
