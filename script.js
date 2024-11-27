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
}

function displayBooks() {
    myLibrary.forEach(function(book, index) {
        const divContainer = document.querySelector("#container");
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
        deleteBtnElement.classList.add("delete-btn") //create elements and add their classes

        divContainer.appendChild(cardElement);
        cardElement.appendChild(titleElement);
        cardElement.appendChild(authorElement);
        cardElement.appendChild(pagesElement);
        cardElement.appendChild(readDivElement);
        readDivElement.appendChild(readBtnElement);
        cardElement.appendChild(deleteDivElement);
        deleteDivElement.appendChild(deleteBtnElement); //add elements to dom;

        titleElement.textContent = book.title;
        authorElement.textContent = `by ${book.author}`;
        pagesElement.textContent = `${book.pages} pages`;
        readBtnElement.textContent = book.readStatus ? "Read" : "Not Read";
        deleteBtnElement.textContent = "Remove"; //add contents to the elements 

        //added event listeners to modify read status and remove button
        readBtnElement.addEventListener("click", () => {
            if(book.readStatus) {
                book.readStatus = false;
                readBtnElement.textContent = "Not Read";
            } else {
                book.readStatus = true;
                readBtnElement.textContent = "Read";
            }
        });

        deleteBtnElement.addEventListener("click", () => {
            cardElement.remove();
            myLibrary.splice(index, 1);
        });
    })
}

function clearFields () {
    const allInputs = document.querySelectorAll("input");
    allInputs.forEach(x => {
        x.value = "";
        x.checked = false;
    });
}

function clearCards () {
    const allCards = document.querySelectorAll(".card");
    allCards.forEach(x => {
        x.remove();
    });
}

const addBookBtn = document.querySelector("#add-newbook-btn").addEventListener("click", () => {
    document.querySelector("dialog").showModal();
});

const closeAddBookBtn = document.querySelector("#dialog-close").addEventListener("click", () => {
    document.querySelector("dialog").close();
    clearFields();
});

const addBook = document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const title = document.querySelector("#new-title").value;
    const author = document.querySelector("#new-author").value;
    const pages = parseInt(document.querySelector("#new-pages").value);
    const readStatus = document.querySelector("#new-read").checked;
    addBookToLibrary(author, title, pages, readStatus);
    clearCards();
    displayBooks();
    clearFields();
});

addBookToLibrary("Charles Dickens", "A Tale Of Two Cities", 440, false);
addBookToLibrary("Antoine de Saint-Exupéry", "The Little Prince (Le Petit Prince)", 96, true);
addBookToLibrary("Paulo Coelho", "The Alchemist (O Alquimista)", 208, false);
addBookToLibrary("J. K. Rowling", "Harry Potter and the Philosopher's Stone", 	309, true);

displayBooks();