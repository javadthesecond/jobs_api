const User = require("../models/User");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const CustomApiError = require("../errors/customError");

const register = async (req, res) => {
  // create user in database
  const user = await User.create({ ...req.body });

  // create the jwt token
  const token = user.createJWT();
  const { name, _id } = user;

  // sending Cookies
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: Number(process.env.MAX_AGE),
  });

  // sending Response
  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: getReasonPhrase(StatusCodes.CREATED),
    data: { name, _id },
    token,
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;
  const token = req.cookies.token;

  if (!email || !password) {
    throw CustomApiError.badRequest(getReasonPhrase(StatusCodes.BAD_REQUEST));
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw CustomApiError.unauthenticatedError(
      "User not found try another email or signUp"
    );
  }

  const passwordValidation = await user.comparePassword(password);

  if (!passwordValidation) {
    throw CustomApiError.badRequest("Incorrect Password");
  }

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: getReasonPhrase(StatusCodes.OK),
    data: { name: user.name, token, user: { ...req.user } },
  });
};

module.exports = { register, login };
