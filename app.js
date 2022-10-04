const newBook = document.getElementById("newBook");
const bookForm = document.getElementById("bookForm");
const bookShelf = document.getElementById("book-shelf");
const modal = document.getElementById("modal");
const submit = document.getElementById("submit");
const overlay = document.getElementById("overlay");
const closeModal = document.getElementById("closeModal");
let isModalOn = false;

newBook.addEventListener("click", () => {
  modal.style.display = "flex";
  overlay.style.opacity = 1;
  isModalOn = true;
});

submit.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.opacity = 0;
  isModalOn = false;
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  overlay.style.opacity = 0;
  isModalOn = false;
  bookForm.reset();
});

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = author + pages;
  this.bookInfo = title + " " + author + " " + pages + " " + read;
}

function getBookFromInput() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  bookForm.reset();
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getBookFromInput();
  addBookToLibrary(myLibrary);
});

function addBookToLibrary(myLibrary) {
  bookShelf.innerHTML = "";
  myLibrary.forEach((book) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book");
    bookCard.setAttribute("id", book.id);

    let titleDisplay = document.createElement("p");
    titleDisplay.innerHTML = book.title;

    let authorDisplay = document.createElement("p");
    authorDisplay.innerHTML = book.author;

    let pagesDisplay = document.createElement("p");
    pagesDisplay.innerHTML = book.pages;

    let readDisplay = document.createElement("button");
    if (book.read == true) {
      readDisplay.innerHTML = "Read";
      readDisplay.className = "bookRead";
    } else {
      readDisplay.innerHTML = "Not Read";
      readDisplay.className = "bookNotRead";
    }

    readDisplay.addEventListener("click", () => {
      if (book.read == true) {
        readDisplay.innerHTML = "Not Read";
        readDisplay.className = "bookNotRead";
        book.read = false;
      } else {
        readDisplay.innerHTML = "Read";
        readDisplay.className = "bookRead";
        book.read = true;
      }
    });

    let deleteDisplay = document.createElement("button");
    deleteDisplay.className = "delete";
    deleteDisplay.innerHTML = "Delete";

    deleteDisplay.addEventListener("click", () => {
      bookShelf.removeChild(bookCard);
      myLibrary.splice(bookCard, 1);
    });

    bookCard.appendChild(titleDisplay);
    bookCard.appendChild(authorDisplay);
    bookCard.appendChild(pagesDisplay);
    bookCard.appendChild(readDisplay);
    bookCard.appendChild(deleteDisplay);

    bookShelf.appendChild(bookCard);
  });
}
