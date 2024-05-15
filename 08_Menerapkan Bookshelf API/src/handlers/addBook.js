const { nanoid } = require('nanoid');
const books = require('../database/books');
const createResponse = require('../utils/createResponse');

/**
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 * @typedef {import('@hapi/hapi').Request} Request
 */

/**
 * Add a new book and return the `bookId` if success
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const addBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (!name) {
    return createResponse(h, 400, 'fail', 'Gagal menambahkan buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    return createResponse(
      h,
      400,
      'fail',
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    );
  }

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);
  const isAdded = books.filter((book) => book.id === id).length > 0;

  if (!isAdded) {
    return createResponse(h, 500, 'error', 'Buku gagal ditambahkan');
  }

  return createResponse(h, 201, 'success', 'Buku berhasil ditambahkan', { bookId: id });
};

module.exports = addBook;
