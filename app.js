let booksGrid = document.getElementById("booksGrid");
let myLibrary = [];

class Book {
  constructor(title, author, pages, readYet) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readYet = readYet;
  }
  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readYet} read yet`;
  }
  inLibrary(library) {
    return library.some((book) => book.title === this.title);
  }
}

// helper functions to add books and update display grid

function addBookToLibrary(name, author, pages, readYet) {
  x = new Book(name, author, pages, readYet);
  if (!x.inLibrary(myLibrary)) {
    myLibrary.push(x);
  }
}

function updateBooksGrid() {
  booksGrid.innerHTML = "";
  for (let book of myLibrary) {
    createBookCard(book);
  }
}

// display modal for adding a book

const modal = document.getElementById("add-book-modal");
const btn = document.getElementById("btn-add");
const span = document.getElementById("submit-add-book");

btn.onclick = function () {
  modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// get data for new book and add it to the list of books

const book_form = document.getElementById("form-add-book");

book_form.addEventListener("submit", (event) => {
  event.preventDefault();

  //get info from form
  title = book_form.elements["title"].value;
  author = book_form.elements["author"].value;
  pages = book_form.elements["pages"].value;
  readYet = book_form.elements["readYet"].checked;

  //update display
  addBookToLibrary(title, author, pages, readYet);
  updateBooksGrid();
});

// display all books in library in a grid

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  title.classList.add("book-title");
  readBtn.classList.add("btn");
  removeBtn.classList.add("btn");

  readBtn.onclick = toggleRead;
  removeBtn.onclick = removeBook;

  title.textContent = `${book.title}`;
  author.textContent = `by ${book.author}`;
  pages.textContent = `${book.pages} pages`;
  removeBtn.textContent = "Remove";

  if (book.readYet) {
    readBtn.textContent = "Read";
    readBtn.classList.add("btn-light-green");
  } else {
    readBtn.textContent = "Not read";
    readBtn.classList.add("btn-light-red");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  booksGrid.appendChild(bookCard);
}

// change read status and remove book buttons

function toggleRead(e) {
  let title = e.target.parentNode.firstChild.textContent;
  let book = myLibrary.find((book) => book.title === title);

  book.readYet = !book.readYet;
  updateBooksGrid();
}

function removeBook(e) {
  let title = e.target.parentNode.firstChild.textContent;
  let book = myLibrary.find((book) => book.title === title);

  myLibrary.splice(
    myLibrary.findIndex((book) => book.title === title),
    1
  );
  updateBooksGrid();
}
