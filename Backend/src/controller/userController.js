import { asyncHandler } from "../utils/asyncHandler.js";
import { Users } from "../Models/userModel.js";
import ApiError from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokens = async (userId) => {
  try {
    const user = await Users.findById(userId);

    const accessToken = await user.generate_Access_Token();
    // user.accessToken = accessToken;
    // await user.save({ validateBeforeSave: false });
    return accessToken;
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating a token");
  }
};

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

  const { email, password } = req.body;
  if (!email && !password)
    throw new ApiError(400, "userName and password is required");
  const user = await Users.findOne({ email });
  if (!user) throw new ApiError(400, "User doesn't exists");

  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) throw new ApiError(401, "Invalid user credentials");
  const accessToken = await generateAccessTokens(user._id);
  console.log(accessToken);

  const loggedInUser = await Users.findById(user._id).select("-password");
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged in successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  Users.findByIdAndUpdate(req.user._id, {
    new: true,
  });
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, res.accessToken, "User Loggedout sucessfully"));
});
