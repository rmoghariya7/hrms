const Joi = require("joi");

const registerUserSchema = {
  body: Joi.object({
    firstName: Joi.string().alphanum().min(2).max(30).required(),
    lastName: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }),
};

module.exports = {
  registerUserSchema,
};
