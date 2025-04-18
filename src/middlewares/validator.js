const ErrorHandler = require("../utils/ErrorHandler");

const validate = (schemas) => {
  return async (req, res, next) => {
    const parts = ["body", "query", "params"];
    const allErrors = [];

    for (const part of parts) {
      if (schemas[part]) {
        try {
          const value = await schemas[part].validateAsync(req[part] || {}, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
          });
          req[part] = value;
        } catch (error) {
          const errors = error.details.map((err) => {
            return {
              message: err.message,
              location: `${part}.${err.path.join(".")}`,
            };
          });
          allErrors.push(...errors);
        }
      }
    }

    if (allErrors.length > 0) {
      return next(new ErrorHandler(allErrors, 400));
    }

    next();
  };
};

module.exports = validate;
