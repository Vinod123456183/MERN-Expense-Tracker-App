// utils/error.js
function errorHandler(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

module.exports = errorHandler;
