const db = require("../db/pool");

const getUser = (email) => {
  return db("users").where("email", email).first();
};

const getOrganization = (email) => {
  return db("organization").where("email", email).first();
};

module.exports = {
  getUser,
  getOrganization,
};
