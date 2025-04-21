const ErrorHandler = require("../utils/ErrorHandler");
const jsonwebtoken = require("jsonwebtoken");
const { env } = require("node:process");

const loggedInAsOrganization = (req, res, next) => {
  const { auth_token } = req.cookies;

  if (!auth_token) {
    return ErrorHandler("You are not logged in", 401);
  }

  const user = jsonwebtoken.verify(auth_token, env.JWT_SECRET);

  if (!user) {
    return ErrorHandler("You are not logged in", 401);
  }

  req.user = { ...user, organizationId: user.id };
  next();
};

module.exports = loggedInAsOrganization;
