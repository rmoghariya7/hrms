const db = require("../db/pool");

const getEmployee = (email) => {
  return db("employee").where("email", email).first();
};

const getOrganization = (email) => {
  return db("organization").where("email", email).first();
};

module.exports = {
  getEmployee,
  getOrganization,
};
