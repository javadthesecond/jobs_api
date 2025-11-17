const User = require("../models/User");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const CustomApiError = require("../errors/customError");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  const token = user.createJWT();
  const { name, _id } = user;

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: Number(process.env.MAX_AGE),
  });

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

  if (!email || !password) {
    throw CustomApiError.badRequest("Email and password required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw CustomApiError.unauthenticatedError("User not found");
  }

  const passwordValid = await user.comparePassword(password);
  if (!passwordValid) {
    throw CustomApiError.badRequest("Incorrect password");
  }

  const token = user.createJWT();
  const { name, _id } = user;

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: Number(process.env.MAX_AGE),
  });

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: getReasonPhrase(StatusCodes.OK),
    data: { name, _id },
    token,
  });
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // immediately expire the cookie
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    status: StatusCodes.OK,
    message: "Logged out successfully",
  });
};

module.exports = { register, login, logout };
