const myLibrary = [];

function Book(author, title, pages, readStatus) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBookToLibrary(author, title, pages, readStatus) {
    const book = new Book(author, title, pages, readStatus);
    myLibrary.push(book);
    saveLibraryToLocalStorage(); 
}

function displayBooks() {
    const divContainer = document.querySelector("#container");
    divContainer.innerHTML = ''; 
    myLibrary.forEach(function(book, index) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        const titleElement = document.createElement("div");
        titleElement.classList.add("title");
        const authorElement = document.createElement("div");
        authorElement.classList.add("author");
        const pagesElement = document.createElement("div");
        pagesElement.classList.add("pages");
        const readDivElement = document.createElement("div");
        readDivElement.classList.add("read");
        const readBtnElement = document.createElement("button");
        readBtnElement.classList.add("read-status");
        const deleteDivElement = document.createElement("div");
        deleteDivElement.classList.add("delete");
        const deleteBtnElement = document.createElement("button");
        deleteBtnElement.classList.add("delete-btn");

        divContainer.appendChild(cardElement);
        cardElement.appendChild(titleElement);
        cardElement.appendChild(authorElement);
        cardElement.appendChild(pagesElement);
        cardElement.appendChild(readDivElement);
        readDivElement.appendChild(readBtnElement);
        cardElement.appendChild(deleteDivElement);
        deleteDivElement.appendChild(deleteBtnElement);

        titleElement.textContent = book.title;
        authorElement.textContent = `by ${book.author}`;
        pagesElement.textContent = `${book.pages} pages`;
        readBtnElement.textContent = book.readStatus ? "Read" : "Not Read";
        deleteBtnElement.textContent = "Remove";

        readBtnElement.addEventListener("click", () => {
            book.readStatus = !book.readStatus;
            readBtnElement.textContent = book.readStatus ? "Read" : "Not Read";
            saveLibraryToLocalStorage(); 
        });

        deleteBtnElement.addEventListener("click", () => {
            cardElement.remove();
            myLibrary.splice(index, 1);
            saveLibraryToLocalStorage(); 
        });
    });
}

function saveLibraryToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function loadLibraryFromLocalStorage() {
    const storedLibrary = JSON.parse(localStorage.getItem('library'));
    if (storedLibrary) {
        storedLibrary.forEach(book => addBookToLibrary(book.author, book.title, book.pages, book.readStatus));
    }
}

window.onload = loadLibraryFromLocalStorage;

const addBookBtn = document.querySelector("#add-newbook-btn").addEventListener("click", () => {
    document.querySelector("dialog").showModal();
});

const closeAddBookBtn = document.querySelector("#dialog-close").addEventListener("click", () => {
    document.querySelector("dialog").close();
    clearFields();
});

const addBookForm = document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#new-title").value;
    const author = document.querySelector("#new-author").value;
    const pages = parseInt(document.querySelector("#new-pages").value);
    const readStatus = document.querySelector("#new-read").checked;

    if (title && author && !isNaN(pages) && pages > 0) {
        addBookToLibrary(author, title, pages, readStatus);
        displayBooks();
        clearFields();
    }
})