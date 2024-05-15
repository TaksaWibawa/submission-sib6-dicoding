const books = require('../database/books');
const createResponse = require('../utils/createResponse');

/**
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 * @typedef {import('@hapi/hapi').Request} Request
 */

/**
 * Get all books by query parameters and return array of books
 * @param {Request} request
 * @param {ResponseToolkit} h
 */
const getBooks = (request, h) => {
  if (books.length === 0) {
    return createResponse(h, 200, 'success', '', { books: [] });
  }

  const { name, reading, finished } = request.query;
  let filteredBooks = [...books];

  if (name) {
    const searchTitle = name.toLowerCase();
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(searchTitle));
  }

  if (reading) {
    const isReading = reading === '1';
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }

  if (finished) {
    const isFinished = finished === '1';
    filteredBooks = filteredBooks.filter((book) => book.finished === isFinished);
  }

  const result = filteredBooks.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));

  return createResponse(h, 200, 'success', '', { books: result });
};

module.exports = getBooks;
