import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
    orderHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true },
);

//hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});
//compare hashed pass
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generate token

userSchema.methods.generateAccessToken = function () {
  try {
    return jwt.sign(
      {
        id: this._id,
        role: this.role,
        email: this.email,
        username: this.username,
      },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: process.env.JWT_ACCESS_EXPIRE },
    );
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.generateRefreshToken = function () {
  try {
    return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: process.env.JWT_REFRESH_EXPIRE,
    });
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model('User', userSchema);

export default User;
