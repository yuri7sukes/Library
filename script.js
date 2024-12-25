const addBookButton = document.querySelector('.header__add-book-btn');
const overlay = document.getElementById("overlay");
const addBookModule = document.querySelector('.add-book');
// const addBookButtonClose = document.querySelector('.add-book__add-btn');

const getModal = function () {
    overlay.classList.add("show");
    addBookModule.style.visibility = "visible";
}

// const closeModal = function (event) {
//     overlay.classList.remove("show");
//     addBookModule.style.visibility = "hidden";
//     event.preventDefault();
// }

addBookButton.addEventListener("click", getModal);
// addBookButtonClose.addEventListener("click", closeModal);

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages; 
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook)
}

function outputBook() {
    document.querySelector(".main").innerHTML = '';
    myLibrary.forEach((book, index) => {
        const bookHTML = `
          <div class="book-card">
          <div class="book-card__title">${book.title}</div>
          <div class="book-card__author">Author: ${book.author}</div>
          <div class="book-card__pages">Pages: ${book.pages}</div>
          <div class="book-card__status-wrapper">
              <label for="book-card__status">Status</label>
              <select name="" id="book-card__status" class="book-card__status">
                <option value="read" ${book.read ? "selected" : ""}>Read ✔</option>
                <option value="want to read" ${!book.read ? "selected" : ""}>Want to read</option>
              </select>
          </div>
          <button class="book-card__remove" data-index="${index}">X</button>
        </div>
        `;
        
        document.querySelector(".main").innerHTML += bookHTML;
      });

    document.querySelectorAll(".book-card__remove").forEach(button => {
        button.addEventListener("click", removeBook);
    });
}

// <p class="book-read">Read: ${book.read ? "Yes" : "No"}</p>

document.getElementById("book-form").addEventListener("submit", (event) => {
    event.preventDefault(); 
    
    const title = document.getElementById("add-book__title").value;
    const author = document.getElementById("add-book__author").value;
    const pages = parseInt(document.getElementById("add-book__pages").value, 10);
    const read = document.getElementById("add-book__status").checked;
    
    addBookToLibrary(title, author, pages, read);
    
    outputBook();
    
    overlay.classList.remove("show");
    addBookModule.style.visibility = "hidden";
    document.getElementById("book-form").reset();
});



function removeBook(event) {
    const index = event.target.getAttribute("data-index"); 
    myLibrary.splice(index, 1); 
    outputBook(); 
}