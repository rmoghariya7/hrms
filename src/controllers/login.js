const asyncHandler = require("../utils/asyncHandler");
const { comparePassword, generateToken } = require("../utils/authHelper");
const { getOrganization, getEmployee } = require("../utils/dbHelper");
const ErrorHandler = require("../utils/ErrorHandler");

const organizationLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const org = await getOrganization(email);

  if (!org) {
    return next(
      new ErrorHandler("User not found with this email, please register", 400)
    );
  }

  const isPasswordMatched = await comparePassword(password, org.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  const authToken = generateToken({
    id: org.id,
    name: org.name,
    email: org.email,
  });

  res.cookie("auth_token", authToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    data: {
      user: {
        id: org.id,
        name: org.name,
        email: org.email,
      },
    },
  });
});

const employeeLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const employee = await getEmployee(email);

  if (!employee) {
    return next(
      new ErrorHandler("User not found with this email, please register", 400)
    );
  }

  const isPasswordMatched = await comparePassword(password, employee.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }

  const authToken = generateToken({
    id: employee.id,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
  });

  res.cookie("auth_token", authToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    data: {
      user: {
        id: employee.id,
        name: employee.firstName,
        email: employee.email,
      },
    },
  });
});

// TODO: implement super admin login
// const superAdminLogin = () => {}

module.exports = { organizationLogin, employeeLogin };
