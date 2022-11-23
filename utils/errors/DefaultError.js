const DEFAULT_ERROR_CODE = 500;

class DefaultError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = DEFAULT_ERROR_CODE;
  }
}

module.exports = { DefaultError };
