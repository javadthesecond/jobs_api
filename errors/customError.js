const { StatusCodes } = require("http-status-codes");

class CustomApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

  static unauthenticatedError(msg = "Unauthorized") {
    return new CustomApiError(msg, StatusCodes.UNAUTHORIZED);
  }

  static notFound(msg = "Not Found") {
    return new CustomApiError(msg, StatusCodes.NOT_FOUND);
  }

  static badRequest(msg = "Bad Request") {
    return new CustomApiError(msg, StatusCodes.BAD_REQUEST);
  }
}

module.exports = CustomApiError;
