import 'dotenv/config';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import User from '../models/user.model.js';
import Vendor from '../models/vendor.model.js';
// import { uploadFileToB2 } from '../middleware/uploadFile.js';
import vendorSchema from '../validators/vendorSchema.js';

//register
const createVendor = asyncHandler(async (req, res) => {
  const { error, value } = vendorSchema.validate(req.body, {
    abortEarly: false,
  });

  const {
    username,
    email,
    password,
    description,
    contact,
    gstin,
    pan,
    website,
    location,
    categories,
  } = value;
  if (error) {
    throw new ApiError(401, error.details.message);
  }

  const file = req.file;
  // console.log(file);
  // if (!file) {
  //   throw new ApiError(400, 'Image upload failed');
  // }

  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError(409, 'User already exists');
  }

  //vendor certification img or pdf upload

  // const bucketId = process.env.B2_BUCKET_ID;
  // console.log(bucketId);
  // const result = await uploadFileToB2(file, bucketId);
  // console.log(result);

  // const response = await downloadFile(bucketId, result.fileId);
  // console.log(response);
  // const imageUrls = [];
  // await Promise.all(
  //   req.files.map((file) => {
  //     const { path } = file;
  //     const result = uploadFile(path, 'vendors');
  //     if (result && result.secure_url) {
  //       imageUrls.push(result.secure_url);
  //       fs.unlinkSync(path);
  //     }
  //   }),
  // );
  // if (imageUrls.length === 0) {
  //   throw new ApiError(400, 'Image upload failed');
  // }
  //vendor profile-img  upload
  // const fileMetadata = [
  //   {
  //     fileName: file.originalname,
  //     fileUrl: result.fileUrl,
  //     fileSize: file.size,
  //     fileType: file.mimetype,
  //   },
  // ];
  //not implemented yet some issue relies
  const vendor = new Vendor({
    username,
    email,
    password,
    description,
    contact,
    gstin,
    pan,
    website,
    location,
    categories,
    status: 'pending',
    role: 'vendor',
  });

  try {
    const newVendor = await vendor.save();
    return res.json(
      new ApiResponse(
        200,
        { newVendor },
        'Vendor registration submitted for review',
      ),
    );
  } catch (error) {
    throw new ApiError(400, error);
  }
});
//login
const vendorLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'Please provide credentials');
  }
  const vendor = await Vendor.findOne({ email });
  if (!vendor) {
    throw new ApiError(404, 'User not found');
  }
  if (vendor.status === 'pending') {
    throw new ApiError(401, 'Please wait for admin approval');
  }
  const isMatch = await vendor.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }
  const accessToken = vendor.generateAccessToken();

  const refreshToken = vendor.generateRefreshToken();
  vendor.refreshToken = refreshToken;
  await vendor.save({ validateBeforeSave: false });
  const options = {
    httpOnly: true,
    secure: true,
  };
  const refreshOptions = {
    httpOnly: true,
    secure: true,
    // path: '/refresh_token',
  };
  const loggedInVendor = await Vendor.findOne({ email }).select(
    '-gstin -pan -password  -refreshToken',
  );

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, refreshOptions)
    .json(new ApiResponse(200, loggedInVendor, 'Login successful'));
});
const getVendor = asyncHandler(async (req, res) => {
  const { vId } = req.params;

  const vendor = await Vendor.findById(vId).select(
    '-gstin -pan -password -files -refreshToken',
  );

  if (!vendor) {
    throw new ApiError(404, 'Vendor not found');
  }
  return res.json(new ApiResponse(200, { vendor }, 'Vendor'));
});
const updateVendor = asyncHandler(async (req, res) => {
  const { username, email, description, phone, website, location, categories } =
    req.body;

  const { vId } = req.params;

  if (!vId) {
    throw new ApiError(400, 'Please provide vendor id');
  }

  const updatedVendor = await Vendor.findByIdAndUpdate(
    vId,
    {
      username,
      email,
      description,
      phone,
      website,
      location,
      categories,
    },
    { new: true },
  );

  return res.json(
    new ApiResponse(200, { updatedVendor }, 'Vendor updated successfully'),
  );
});
const deleteVendor = asyncHandler(async (req, res) => {
  const { vId } = req.params;
  await Vendor.findByIdAndDelete(vId);
  return res.json(new ApiResponse(200, {}, 'Vendor deleted successfully'));
});

export { createVendor, vendorLogin, updateVendor, deleteVendor, getVendor };
