const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (schema) => async (req, res, next) => {
  console.log("schema", schema);
  try {
    req.body = await schema.validateAsync(req.body || {}, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });
    console.log("req.body", req.body);
    next();
  } catch (error) {
    console.log("error 👻", error);
    const errors = error.inner?.map((err) => ({
      message: err.message,
      field: err.path,
    })) || [{ message: error.message }];

    return next(new ErrorHandler(errors, 400));
  }
};
