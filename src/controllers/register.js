const db = require("../db/pool");
const { getUser, getOrganization } = require("../utils/dbHelper");
const ErrorHandler = require("../utils/ErrorHandler");
const { generateToken, encryptPassword } = require("../utils/authHelper");
const ResponseHandler = require("../utils/responseHandler");
const { Roles } = require("../../constants");
const asyncHandler = require("../utils/asyncHandler");

const registerEmployee = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password, organizationId } = req.body;
  const Response = new ResponseHandler(res);

  // check if user already exists
  const isUserAlreadyExist = await getUser(email);

  if (isUserAlreadyExist) {
    return next(
      new ErrorHandler("Something went wrong while registering user", 400)
    );
  }

  // encrypt password
  const encryptedPassword = await encryptPassword(password);

  await db.transaction(async (trx) => {
    const [employee] = await trx("employee")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        password: encryptedPassword,
      })
      .returning("id");

    if (!employee) {
      return next(
        new ErrorHandler("Something went wrong while registering user", 400)
      );
    }

    const authToken = generateToken({
      id: employee.id,
      firstName,
      lastName,
      email,
    });

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

    res.cookie("auth_token", authToken, {
      httpOnly: true,
      sameSite: "strict",
    });

    // send response
    Response.success(
      {
        employee: {
          id: employee[0].id,
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

module.exports = {
  registerEmployee,
  registerOrganization,
};
