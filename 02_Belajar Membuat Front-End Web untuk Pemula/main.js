// Constants
const COMPLETED_BOOKSHELF_LIST = 'COMPLETED_BOOKSHELF_LIST';
const UNCOMPLETED_BOOKSHELF_LIST = 'UNCOMPLETED_BOOKSHELF_LIST';

// Event listeners
window.onload = displayBooks;

document.getElementById('inputBook').addEventListener('submit', function (event) {
	event.preventDefault();

	let title = document.getElementById('inputBookTitle').value;
	let author = document.getElementById('inputBookAuthor').value;
	let year = document.getElementById('inputBookYear').value;
	let isComplete = document.getElementById('inputBookIsComplete').checked;

	const book = {
		id: +new Date(),
		title: title,
		author: author,
		year: Number(year),
		isComplete: isComplete,
	};

	addNewBook(book);
	this.reset();
});

document.addEventListener('click', function (event) {
	const dataset = event.target.parentElement.parentElement.dataset;

	if (event.target.id === 'moveButton') {
		if (event.target.textContent === 'Selesai dibaca') {
			moveBookToCompleted(dataset.id);
		} else {
			moveBookToUncompleted(dataset.id);
		}
	} else if (event.target.id === 'removeButton') {
		removeBook({ id: Number(dataset.id), isComplete: dataset.isComplete === 'true' });
	}
});

document.getElementById('searchBook').addEventListener('submit', function (event) {
	event.preventDefault();

	const keyword = document.getElementById('searchBookTitle').value.toLowerCase();
	findBookByName(keyword);
});

// Main functions
function addNewBook(bookData) {
	const { completedBookshelfList, uncompletedBookshelfList } = getBookshelfList();
	if (bookData.isComplete) {
		completedBookshelfList.push(bookData);
		saveToLocalStorage(COMPLETED_BOOKSHELF_LIST, completedBookshelfList);
	} else {
		uncompletedBookshelfList.push(bookData);
		saveToLocalStorage(UNCOMPLETED_BOOKSHELF_LIST, uncompletedBookshelfList);
	}

	displayBooks();
	alert('Buku berhasil ditambahkan');
}

function moveBookToCompleted(bookId) {
	const { completedBookshelfList, uncompletedBookshelfList } = getBookshelfList();

	bookId = Number(bookId);
	const bookIndex = uncompletedBookshelfList.findIndex((book) => book.id === bookId);
	const book = uncompletedBookshelfList[bookIndex];

	book.isComplete = true;
	completedBookshelfList.push(book);
	uncompletedBookshelfList.splice(bookIndex, 1);

	saveToLocalStorage(COMPLETED_BOOKSHELF_LIST, completedBookshelfList);
	saveToLocalStorage(UNCOMPLETED_BOOKSHELF_LIST, uncompletedBookshelfList);

	displayBooks();
	alert('Buku berhasil dipindahkan');
}

function moveBookToUncompleted(bookId) {
	const { completedBookshelfList, uncompletedBookshelfList } = getBookshelfList();

	bookId = Number(bookId);
	const bookIndex = completedBookshelfList.findIndex((book) => book.id === bookId);
	const book = completedBookshelfList[bookIndex];

	book.isComplete = false;
	uncompletedBookshelfList.push(book);
	completedBookshelfList.splice(bookIndex, 1);

	saveToLocalStorage(COMPLETED_BOOKSHELF_LIST, completedBookshelfList);
	saveToLocalStorage(UNCOMPLETED_BOOKSHELF_LIST, uncompletedBookshelfList);

	displayBooks();
	alert('Buku berhasil dipindahkan');
}

function displayBooks(bookshelfList) {
	if (bookshelfList instanceof Event) {
		bookshelfList = getBookshelfList();
	} else {
		bookshelfList = bookshelfList || getBookshelfList();
	}

	const completedContainer = document.getElementById('completedBookshelfList');
	const uncompletedContainer = document.getElementById('uncompletedBookshelfList');

	clearElement(completedContainer);
	clearElement(uncompletedContainer);

	if (bookshelfList.completedBookshelfList.length === 0) {
		completedContainer.textContent = 'Tidak ada buku yang selesai dibaca';
		completedContainer.style.textAlign = 'center';
	} else {
		bookshelfList.completedBookshelfList.forEach((book) => {
			const bookElement = createBookElement(book);
			completedContainer.appendChild(bookElement);
		});
	}

	if (bookshelfList.uncompletedBookshelfList.length === 0) {
		uncompletedContainer.textContent = 'Tidak ada buku yang belum selesai dibaca';
		uncompletedContainer.style.textAlign = 'center';
	} else {
		bookshelfList.uncompletedBookshelfList.forEach((book) => {
			const bookElement = createBookElement(book);
			uncompletedContainer.appendChild(bookElement);
		});
	}
}

function removeBook(bookData) {
	confirm('Apakah anda yakin ingin menghapus buku ini?', function (confirmed) {
		if (confirmed) {
			const { completedBookshelfList, uncompletedBookshelfList } = getBookshelfList();
			const { id, isComplete } = bookData;

			if (isComplete) {
				const bookIndex = completedBookshelfList.findIndex((book) => book.id === id);
				completedBookshelfList.splice(bookIndex, 1);
				saveToLocalStorage(COMPLETED_BOOKSHELF_LIST, completedBookshelfList);
			} else {
				const bookIndex = uncompletedBookshelfList.findIndex((book) => book.id === id);
				uncompletedBookshelfList.splice(bookIndex, 1);
				saveToLocalStorage(UNCOMPLETED_BOOKSHELF_LIST, uncompletedBookshelfList);
			}

			displayBooks();
			alert('Buku berhasil dihapus');
		}
	});
}

function findBookByName(keyword) {
	const { completedBookshelfList, uncompletedBookshelfList } = getBookshelfList();

	const filteredCompletedBookshelfList = completedBookshelfList.filter((book) => book.title.toLowerCase().includes(keyword));
	const filteredUncompletedBookshelfList = uncompletedBookshelfList.filter((book) => book.title.toLowerCase().includes(keyword));

	displayBooks({
		completedBookshelfList: filteredCompletedBookshelfList,
		uncompletedBookshelfList: filteredUncompletedBookshelfList,
	});
}

// Utilitiy functions
function getBookshelfList() {
	return {
		completedBookshelfList: JSON.parse(localStorage.getItem(COMPLETED_BOOKSHELF_LIST)) || [],
		uncompletedBookshelfList: JSON.parse(localStorage.getItem(UNCOMPLETED_BOOKSHELF_LIST)) || [],
	};
}
function saveToLocalStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function clearElement(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
}

function createBookElement(book) {
	const article = document.createElement('article');
	article.className = 'book_item';
	article.dataset.id = book.id;
	article.dataset.isComplete = book.isComplete;

	const h3 = document.createElement('h3');
	h3.textContent = book.title;
	article.appendChild(h3);

	const authorP = document.createElement('p');
	authorP.textContent = `Penulis: ${book.author}`;
	article.appendChild(authorP);

	const yearP = document.createElement('p');
	yearP.textContent = `Tahun: ${book.year}`;
	article.appendChild(yearP);

	const actionDiv = document.createElement('div');
	actionDiv.className = 'action';

	const greenButton = document.createElement('button');
	greenButton.className = 'green';
	greenButton.id = 'moveButton';
	greenButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
	actionDiv.appendChild(greenButton);

	const redButton = document.createElement('button');
	redButton.className = 'red';
	redButton.id = 'removeButton';
	redButton.textContent = 'Hapus buku';
	actionDiv.appendChild(redButton);

	article.appendChild(actionDiv);

	return article;
}

function confirm(message, callback) {
	const confirmDialog = document.getElementById('dialogContainer');
	const confirmMessage = document.getElementById('confirmMessage');
	const confirmYes = document.getElementById('confirmYes');
	const confirmNo = document.getElementById('confirmNo');

	confirmMessage.textContent = message;
	confirmDialog.classList.remove('hidden');

	confirmYes.onclick = function () {
		confirmDialog.classList.add('hidden');
		callback(true);
	};

	confirmNo.onclick = function () {
		confirmDialog.classList.add('hidden');
		callback(false);
	};
}
