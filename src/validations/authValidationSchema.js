const Joi = require("joi");

const registerUser = Joi.object({
  firstName: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email().required(),
});
