const express = require("express");
const {
  registerOrganization,
  registerEmployee,
} = require("../controllers/register");
const validator = require("../middlewares/validator");
const {
  registerEmployeeSchema,
  registerOrgSchema,
} = require("../validations/authValidationSchema");
const loggedInAsOrganization = require("../middlewares/loggedInAsOrganization");
const router = express.Router();

router.post(
  "/",
  loggedInAsOrganization,
  validator(registerEmployeeSchema),
  registerEmployee
);

router.post("/org", validator(registerOrgSchema), registerOrganization);

// TODO: implement superuser registration
// router.post("/superuser", validator(registerEmployeeSchema), registerEmployee);

module.exports = router;
