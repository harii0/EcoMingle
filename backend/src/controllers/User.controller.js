import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js'
import { ApiError } from '../utils/apiError.js';
//create user

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if ([name, email, password].some((field) => !field?.trim())) {
        res.status(400);
        throw new ApiError(400, 'Please add all fields', ['name', 'email', 'password'],);
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
        throw new ApiError(409, 'User already exists');
    }

    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            token: user.generateAccessToken(),
        });
    } else {
        res.status(400);
        throw new ApiError(400, 'Invalid user data');
    }

})

//login user
const loginUser = asyncHandler(async (req, res) => {

})
//update user
const updateUser = asyncHandler(async (req, res) => {

})
//forgot password
const forgotPassword = asyncHandler(async (req, res) => {

})
//set neccessary cookies
//rbac auth
//jwt

export { registerUser, updateUser, loginUser, forgotPassword };
