const books = require('../database/books');
const createResponse = require('../utils/createResponse');

/**
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 * @typedef {import('@hapi/hapi').Request} Request
 */

/**
 * Get a book by it's `bookId` and return the book data
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const getBookById = (request, h) => {
  const { bookId } = request.params;

  const result = books.filter((book) => book.id === bookId)[0];

  if (!result) {
    return createResponse(h, 404, 'fail', 'Buku tidak ditemukan');
  }

  return createResponse(h, 200, 'success', '', { book: result });
};

module.exports = getBookById;
