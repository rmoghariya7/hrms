const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validator");
const { organizationLogin, employeeLogin } = require("../controllers/login");
const { loginSchema } = require("../validations/authValidationSchema");

router.post("/organization", validate(loginSchema), organizationLogin);

router.post("/employee", validate(loginSchema), employeeLogin);

// TODO: implement super admin login route

module.exports = router;
