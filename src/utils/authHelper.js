const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { env } = require("node:process");

const generateToken = (data) => {
  const token = jwt.sign(data, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRATION,
  });

  return token;
};

const encryptPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
};

const comparePassword = (password, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

module.exports = {
  generateToken,
  encryptPassword,
  comparePassword,
};
