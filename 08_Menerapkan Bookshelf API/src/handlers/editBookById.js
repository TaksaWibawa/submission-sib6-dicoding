const books = require('../database/books');
const createResponse = require('../utils/createResponse');

/**
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 * @typedef {import('@hapi/hapi').Request} Request
 */

/**
 * Edit a book by it's `bookId` and return success message
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const editBookById = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    return createResponse(h, 404, 'fail', 'Gagal memperbarui buku. Id tidak ditemukan');
  }

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();

  if (!name) {
    return createResponse(h, 400, 'fail', 'Gagal memperbarui buku. Mohon isi nama buku');
  }

  if (readPage > pageCount) {
    return createResponse(
      h,
      400,
      'fail',
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    );
  }

  const finished = pageCount === readPage;
  const updatedBook = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    updatedAt,
  };

  books[index] = updatedBook;

  return createResponse(h, 200, 'success', 'Buku berhasil diperbarui');
};

module.exports = editBookById;
