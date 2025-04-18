class ErrorHandler extends Error {
  constructor(error, code) {
    super(typeof error === "string" ? error : "Something went wrong");
    this.error = error;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
