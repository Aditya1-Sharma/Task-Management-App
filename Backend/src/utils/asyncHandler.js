import { errorHandler } from "./ApiError.js";

export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      console.log("error from asynchandler", err);
      errorHandler(err, req, res);
    });
  };
};
