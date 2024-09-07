class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred",
    });
  }
};

export { ApiError, errorHandler };
