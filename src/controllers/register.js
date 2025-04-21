const db = require("../db/pool");
const { getEmployee, getOrganization } = require("../utils/dbHelper");
const ErrorHandler = require("../utils/ErrorHandler");
const { generateToken, encryptPassword } = require("../utils/authHelper");
const ResponseHandler = require("../utils/responseHandler");
const { Roles } = require("../../constants");
const asyncHandler = require("../utils/asyncHandler");

const registerEmployee = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const { organizationId, email: orgEmail } = req.user;

  const organization = await getOrganization(orgEmail);

  if (!organization) {
    return next(
      new ErrorHandler("Organization not found, please register first", 400)
    );
  }

  const Response = new ResponseHandler(res);

  // check if user already exists
  const isUserAlreadyExist = await getEmployee(email);

  if (isUserAlreadyExist) {
    return next(new ErrorHandler("Email already exist", 400));
  }

  // encrypt password
  const encryptedPassword = await encryptPassword(password);

  await db.transaction(async (trx) => {
    const [employee] = await trx("employee")
      .insert({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
      })
      .returning("id");

    if (!employee) {
      return next(
        new ErrorHandler("Something went wrong while registering user", 400)
      );
    }

    // add user to user_org table
    await trx("employee_organization").insert({
      employee_id: employee.id,
      organization_id: organizationId,
    });

    // add role
    await trx("employee_roles").insert({
      employee_id: employee.id,
      role: Roles.MEMBER,
    });

    // send response
    Response.success(
      {
        employee: {
          id: employee.id,
          firstName,
          lastName,
          email,
        },
      },
      "Employee registered successfully",
      201
    );
  });
});

const registerOrganization = asyncHandler(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    country,
    zip_code,
    password,
  } = req.body;

  const Response = new ResponseHandler(res);

  // check if user already exists
  const isOrgAlreadyExists = await getOrganization(email);

  if (isOrgAlreadyExists) {
    return next(
      new ErrorHandler("User already exists with this email, please login", 400)
    );
  }

  // encrypt password
  const encryptedPassword = await encryptPassword(password);

  // start transaction

  await db.transaction(async (trx) => {
    const org = await trx("organization")
      .insert({
        name: name,
        email,
        phone,
        address,
        city,
        state,
        country,
        zip_code,
        password: encryptedPassword,
      })
      .returning("id");

    if (!org) {
      return next(
        new ErrorHandler("Something went wrong while registering user", 400)
      );
    }

    // create jwt token
    const token = generateToken({
      id: org[0].id,
      name,
      email,
    });

    // set cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    // send response
    Response.success(
      {
        organization: {
          id: org[0].id,
          name,
          email,
        },
      },
      "Organization registered successfully",
      201
    );
  });
});

// TODO: implement super admin registration
// const registerSuperAdmin = asyncHandler(async (req, res, next) => {

module.exports = {
  registerEmployee,
  registerOrganization,
};
