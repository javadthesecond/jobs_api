const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const notFound = (req, res) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    status: StatusCodes.NOT_FOUND,
    message: getReasonPhrase(StatusCodes.NOT_FOUND),
    path: req.originalUrl,
  });
};

module.exports = notFound;
