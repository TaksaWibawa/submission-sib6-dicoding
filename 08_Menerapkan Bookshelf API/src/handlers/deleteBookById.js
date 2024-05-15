const books = require('../database/books');
const createResponse = require('../utils/createResponse');

/**
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 * @typedef {import('@hapi/hapi').Request} Request
 */

/**
 * Delete a book by it's `bookId` and return success message
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const deleteBookById = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);
  if (index === -1) {
    return createResponse(h, 404, 'fail', 'Buku gagal dihapus. Id tidak ditemukan');
  }

  books.splice(index, 1);

  return createResponse(h, 200, 'success', 'Buku berhasil dihapus');
};

module.exports = deleteBookById;
