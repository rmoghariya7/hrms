const jwt = require("jsonwebtoken");
const { env } = require("node:process");
const ErrorHandler = require("../utils/ErrorHandler");

const isLoggedIn = (req, res, next) => {
  const { auth_token } = req.cookies;

  if (!auth_token) {
    throw new ErrorHandler("Unauthorized, Login to access", 401);
  }

  const user = jwt.verify(auth_token, env.JWT_SECRET);

  if (!user) {
    throw new ErrorHandler("Unauthorized, Login to access", 401);
  }

  req.user = user;

  next();
};

module.exports = isLoggedIn;
