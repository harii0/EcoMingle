import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
//create user

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, 'Please add all fields');
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError(409, 'User already exists');
  }
  const user = await User.create({ username, email, password });
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save();
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(201)
    .cookie('accessToken', accessToken, options)
    .json(
      new ApiResponse(201, {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      }),
    );
});

//login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(400, 'Please add all fields');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
          },
        },
        'Logged in successfully',
      ),
    );
});
//logout user
const logoutUser = asyncHandler(async (req, res) => {
  const loggedOutUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: {
        refreshToken: null,
      },
    },
    { new: true },
  );
  console.log(loggedOutUser);
  const options = {
    httpOnly: true,
  };
  return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken')
    .json(new ApiResponse(200, {}, 'Logged out successfully'));
});
//update user
const updateUser = asyncHandler(async (req, res) => {});
//forgot password
const forgotPassword = asyncHandler(async (req, res) => {});
export { registerUser, updateUser, loginUser, logoutUser, forgotPassword };
