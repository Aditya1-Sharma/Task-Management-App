// class ApiError extends Error {
//   constructor(
//     statusCode,
//     message = "Something went wrong!!!",
//     errors = [],
//     stack = "",
//     data = ""
//   ) {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = data;
//     this.message = message;
//     this.success = false; // Corrected the typo here from 'sucess' to 'success'
//     this.errors = errors;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export default ApiError;

// errorMiddleware.js

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const statusCode = err.statusCode || 600;
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
  next();
};

export { ApiError, errorHandler };
