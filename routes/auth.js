const express = require("express");
const router = express.Router();
const authenticationMiddleware = require("../middlewares/authentication");

const { login, register } = require("../controllers/auth");

router.route("/register").post(register);
router.route("/login").post(authenticationMiddleware, login);

module.exports = router;
