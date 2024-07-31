import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import crypto from 'crypto';

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
      default: '',
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
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

//hash password and create avatar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);
  if (!this.avatar) {
    const avatarText = this.username.charAt(0).toUpperCase();
    this.avatar = cloudinary.url(`text:${avatarText}`, {
      width: 100,
      height: 100,
      crop: 'fit',
      gravity: 'center',
      color: '#ffffff',
      background: '#000000',
    });
  }
  next();
});
//compare hashed pass
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generate token

userSchema.methods.generateAccessToken = function () {
  try {
    console.log('JWT_ACCESS_EXPIRE:', process.env.JWT_ACCESS_TOKEN);
    return jwt.sign(
      {
        id: this._id,
        role: this.role,
        email: this.email,
        username: this.username,
      },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: '15m' },
    );
  } catch (error) {
    console.log('error', error);
  }
};
userSchema.methods.generateRefreshToken = function () {
  try {
    return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: '14d',
    });
  } catch (error) {
    console.log(error);
  }
};
userSchema.methods.generateResetToken = function () {
  try {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.resetPasswordExpire = Date.now() + 15 * (60 * 1000);
    return resetToken;
  } catch (error) {
    console.log(error);
  }
};
const User = mongoose.model('User', userSchema);

export default User;
