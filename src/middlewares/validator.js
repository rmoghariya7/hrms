module.exports = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });
    next();
  } catch (error) {
    res.status(400).json({
      errors: error.inner.map((err) => ({
        message: err.message,
        field: err.path,
      })),
    });
  }
};
