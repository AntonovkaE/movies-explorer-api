const BAD_REQUEST_ERROR_CODE = 400;

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST_ERROR_CODE;
  }
}

module.exports = { BadRequest };
