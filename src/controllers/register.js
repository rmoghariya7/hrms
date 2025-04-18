const ErrorHandler = require("../utils/ErrorHandler");

const registerUser = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    next(new ErrorHandler("Username and password are required", 400));
  }
};

module.exports = {
  registerUser,
};
