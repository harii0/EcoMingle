import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import 'dotenv/config';

export const verifyJwt = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req?.header('Authorization').replace('Bearer ', '');
  if (!token) {
    throw new ApiError(401, 'Unauthorized ');
  }
  const payload = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
  const user = await User.findById(payload.id);
  if (!user) {
    throw new ApiError(401, 'Invalid Token');
  }
  req.user = user;
  next();
});
