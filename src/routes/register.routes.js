const express = require("express");
const { registerUser } = require("../controllers/register");
const validator = require("../middlewares/validator");
const { registerUserSchema } = require("../validations/authValidationSchema");
const router = express.Router();

router.post("/", validator(registerUserSchema), registerUser);

module.exports = router;
