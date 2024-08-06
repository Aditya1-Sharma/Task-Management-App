import { asyncHandler } from "../utils/asyncHandler.js";
import { Users } from "../Models/userModel.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const registerUser = asyncHandler(async (req, res) => {
  // get the user details from the frontend
  // VAlidation not empty
  // check if user already exists

  const { userName, email, password } = req.body;

  const array = [email, userName, password];
  if (array.some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await Users.findOne({ $or: [{ userName }, { email }] });
  if (existedUser)
    throw new ApiError(409, "User with this email and userName alredy exists");

  const user = await Users.create({
    userName: userName.toLowerCase(),
    email,
    password,
  });
  const createdUser = await Users.findById(user._id).select("-password");
  if (!createdUser)
    return new ApiError(500, "Something went wrong while registering the user");

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  // Email and password from the body
  // find if user exists
  // check password  => generate acess token
});
