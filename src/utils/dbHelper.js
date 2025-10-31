const db = require("../db/pool");

const getEmployee = (email) => {
  return db("employee").where("email", email).first();
};

const getUser = async (id) => {
  return db("employee")
    .where("id", id)
    .join("employee_roles", "employee.id", "employee_roles.employee_id")
    .select(
      "employee.id",
      "employee.email",
      "employee.firstName",
      "employee.lastName",
      "employee_roles.role"
    )
    .first();
};

const getOrganizationByEmail = async (email) => {
  return db("organization").where("email", email).first();
};
const getOrganization = async (id) => {
  return db("organization")
    .where("id", id)
    .select(
      "organization.id",
      "organization.email",
      "organization.name",
      "organization_roles.role"
    )
    .first();
};

module.exports = {
  getEmployee,
  getUser,
  getOrganizationByEmail,
  getOrganization,
};
