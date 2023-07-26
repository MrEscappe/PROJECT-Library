class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = Number(pages);
		this.read = read;
	}
}

class Library {
	constructor() {
		this.books = [];
	}

	addBook(book) {
		this.books.push(book);
	}

	removeBook(title, author) {
		this.books = this.books.filter((book) => book.title !== title || book.author !== author);
	}

	toggleRead(title, author) {
		const book = this.books.find((book) => book.title === title && book.author === author);
		if (book) {
			book.read = !book.read;
		}
	}
}

const library = new Library();

const addBookBtn = document.querySelector(".btn-add-box");
const submitBtn = document.querySelector(".btn-submit");
const container = document.querySelector(".article-container");

addBookBtn.addEventListener("click", () => {
	const form = document.querySelector(".container-form-box");
	form.classList.toggle("hidden");
});

submitBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const form = document.querySelector(".container-form-box");
	form.classList.toggle("hidden");
	const title = document.querySelector("#title").value;
	const author = document.querySelector("#author").value;
	const pages = document.querySelector("#pages").value;
	const read = document.querySelector("#read").checked;
	const book = new Book(title, author, pages, read);
	library.addBook(book);

	const card = createCard(book);
	container.appendChild(card);
});

container.addEventListener("click", (e) => {
	if (e.target.classList.contains("btn-remove")) {
		const card = e.target.closest(".card");
		const title = card.querySelector(".book-title").textContent;
		const author = card.querySelector(".book-author").textContent;
		library.removeBook(title, author);
		card.remove();
	} else if (e.target.classList.contains("btn-read")) {
		const card = e.target.closest(".card");
		const title = card.querySelector(".book-title").textContent;
		const author = card.querySelector(".book-author").textContent;
		library.toggleRead(title, author);
		updateReadStatus(
			card,
			library.books.find((book) => book.title === title && book.author === author)
		);
		// change the color of the button
		const readBtn = card.querySelector(".btn-read");
		readBtn.classList.toggle("btn-read");
		readBtn.classList.toggle("btn-not-read");
	}
});

function createCard(book) {
	const card = document.createElement("div");
	card.classList.add("card");
	card.innerHTML = `
	  <div class="card-info">
		<div class="card-title"><span class="book-title">${book.title}</span></div>
		<div class="card-subinfo">
		  <p class="card-author">
			By
			<span class="author-name book-author">${book.author}</span>
		  </p>
		  <p class="card-pages">
			Pages:
			<span class="pages-number book-pages">${book.pages}</span>
		  </p>
		</div>
		<div class="btn-container">
		  <button class="btn btn-read">${book.read ? "Read" : "Not Read"}</button>
		  <button class="btn btn-remove">Remove</button>
		</div>
	  </div>
	`;
	return card;
}

function updateReadStatus(card, book) {
	const readBtn = card.querySelector(".btn-read");
	readBtn.textContent = book.read ? "Read" : "Not Read";
}
