import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
// File Schema
const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number, required: true },
    fileType: { type: String, required: true },
  },
  { _id: false },
);
const locationSchema = new mongoose.Schema(
  {
    address: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    country: { type: String, trim: true },
    postalCode: { type: String, trim: true },
  },
  { _id: false },
);

// Vendor Schema
const vendorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },
  phone: {
    type: String,
  },
  location: locationSchema,
  website: {
    type: String,
    trim: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  gstin: {
    type: String,
    trim: true,
  },
  pan: {
    type: String,
    trim: true,
  },
  categories: [
    {
      type: String,
    },
  ],
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'vendor',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  files: [fileSchema], // Integrated fileSchema
  refreshToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

vendorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);

  next();
});
// Compare Password Method
vendorSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};
//tokens
vendorSchema.methods.generateAccessToken = function () {
  try {
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
vendorSchema.methods.generateRefreshToken = function () {
  try {
    return jwt.sign({ id: this._id }, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: '14d',
    });
  } catch (error) {
    console.log(error);
  }
};

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor;
