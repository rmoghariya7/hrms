const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validator");
const login = require("../controllers/login");
const { loginUserSchema } = require("../validations/authValidationSchema");

router.post("/", validate(loginUserSchema), login);

module.exports = router;
