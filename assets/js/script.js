const addBookBtn = document.querySelector(".btn-add-box");
const removeBookBtn = document.querySelector(".btn-remove");
const readBookBtn = document.querySelector(".btn-read");
const submitBtn = document.querySelector(".btn-submit");

const cardContainer = document.querySelector(".card");
const cardTitle = document.querySelector(".book-title");
const cardAuthor = document.querySelector(".book-author");
const cardPages = document.querySelector(".book-pages");

// Event Listeners

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
	myLibrary.push(book);
	console.log(myLibrary);

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
				<button class="btn btn-read">Not Read</button>
				<button class="btn btn-remove">Remove</button>
			</div>
		</div>
	`;
	const container = document.querySelector(".article-container");
	container.appendChild(card);
});

removeBookBtn.addEventListener("click", (e) => {
	console.log(e.target);
	if (e.target.classList.contains("btn-remove")) {
		const card = e.target.closest(".card");
		card.remove();
	}
});

// function removeBook(title, author) {
// 	for (let i = 0; i < myLibrary.length; i++) {
// 		if (myLibrary[i].title === title && myLibrary[i].author === author) {
// 			myLibrary.splice(i, 1);
// 		}
// 	}
// 	console.log(myLibrary);
// }

// Book code

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = Number(pages);
	this.read = read;
}

// Storage

let myLibrary = [];
