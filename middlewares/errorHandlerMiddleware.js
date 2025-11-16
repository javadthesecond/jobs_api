const CustomApiError = require("../errors/customError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        status: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        message:
          err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
  }

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
};

module.exports = errorHandlerMiddleware;
