const jwt = require("jsonwebtoken");
const CustomApiError = require("../errors/customError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const authenticationMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    throw CustomApiError.unauthenticatedError(
      getReasonPhrase(StatusCodes.UNAUTHORIZED)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId, name } = decoded;
    req.user = { userId, name };
    next();
  } catch (error) {
    throw new CustomApiError(getReasonPhrase(StatusCodes.UNAUTHORIZED));
  }
};

module.exports = authenticationMiddleware;
