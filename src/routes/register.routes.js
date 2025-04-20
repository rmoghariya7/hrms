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
const router = express.Router();

router.post("/", validator(registerEmployeeSchema), registerEmployee);

router.post("/org", validator(registerOrgSchema), registerOrganization);

module.exports = router;
