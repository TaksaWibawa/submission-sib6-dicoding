/**
 * @typedef {import('@hapi/hapi').ResponseToolkit} ResponseToolkit
 *
 * @typedef {Object} ResponseData
 * @property {string} status
 * @property {string} message
 * @property {Array|Object} [data]
 */

/**
 * Boilerplate for creating a response object
 * @param {ResponseToolkit} h
 * @param {number} statusCode
 * @param {string} status
 * @param {string} [message]
 * @param {Array|Object} [data]
 * @returns {ResponseData}
 */
const createResponse = (h, statusCode, status, message = '', data = null) => {
  const responseObject = {
    status,
  };

  if (message !== '') {
    responseObject.message = message;
  }

  if (data !== null) {
    responseObject.data = data;
  }

  const response = h.response(responseObject);
  response.code(statusCode);
  return response;
};

module.exports = createResponse;
