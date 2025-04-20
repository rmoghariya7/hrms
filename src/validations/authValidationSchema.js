const Joi = require("joi");

const registerEmployeeSchema = {
  body: Joi.object({
    firstName: Joi.string().alphanum().min(2).max(30).required(),
    lastName: Joi.string().alphanum().min(2).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    organizationId: Joi.number().required(),
  }),
};

const registerOrgSchema = {
  body: Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zip_code: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const loginUserSchema = {
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports = {
  registerEmployeeSchema,
  loginUserSchema,
  registerOrgSchema,
};
