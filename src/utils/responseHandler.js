class ResponseHandler {
  constructor(res) {
    this.res = res;
  }

  success(data = {}, message = "Success", statusCode = 200) {
    return this.res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  error(message = "Something went wrong", statusCode = 500, error = null) {
    return this.res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }

  // Optional: add more custom methods
  created(data = {}, message = "Resource created") {
    return this.success(data, message, 201);
  }

  notFound(message = "Resource not found") {
    return this.error(message, 404);
  }
}

module.exports = ResponseHandler;
