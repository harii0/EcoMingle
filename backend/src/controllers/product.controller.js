import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import uploadFile from '../utils/cloudinary.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

//get all product items
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  console.log(products);
  if (!products) {
    throw new ApiError(200, 'Products not found');
  }
  return res.status(200).json(new ApiResponse(200, { products }, 'Products'));
});
//get product items by id
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id).populate('prouctItem');
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return res.status(200).json(new ApiResponse(200, { product }, 'Product'));
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    productName,
    price,
    description,
    category,
    countInStock,
    rating,
    discount,
  } = req.body;

  const imageUrls = [];
  // for (const file of req.files) {
  //   const { path } = file;
  //   console.log(path);
  //   const result = await uploadFile(path);
  //   if (result && result.secure_url) {
  //     imageUrls.push(result.secure_url);
  //     fs.unlinkSync(path);
  //   }
  // }
  await Promise.all(
    req.files.map(async (file) => {
      const { path } = file;
      const result = await uploadFile(path);
      if (result && result.secure_url) {
        imageUrls.push(result.secure_url);
        fs.unlink(path, (err) => {
          if (err) {
            console.error(`Error deleting file ${path}:`, err);
          }
        });
      }
    }),
  );
  if (imageUrls.length === 0) {
    throw new ApiError(400, 'Image upload failed');
  }
  console.log(imageUrls);
  const product = await Product.create({
    productName,
    price,
    description,
    ProductImage: imageUrls,
    category,
    countInStock,
    rating,
    discount,
  });
  if (!product) {
    throw new ApiError(400, 'Product not created');
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { product }, 'Product created successfully'));
});

const updateProduct = asyncHandler(async (req, res) => {
  // Need product id
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  // Product data via req.body
  const {
    productName,
    price,
    description,
    category,
    countInStock,
    rating,
    discount,
  } = req.body;

  const files = req.files;
  const imageUrls = [];
  const productImg = product.ProductImage;
  const newImgUploaded = files && files.length > 0;

  // Delete old images
  if (newImgUploaded && productImg && productImg.length > 0) {
    await Promise.all(
      productImg.map(async (image) => {
        const publicId = 'uploads/' + image.split('/').pop().split('.')[0];
        try {
          await cloudinary.uploader.destroy(publicId);
          console.log('Deleted:', publicId);
        } catch (error) {
          throw new ApiError(500, 'Error in deleting old images');
        }
      }),
    );
  }

  // Upload new images
  if (newImgUploaded) {
    await Promise.all(
      files.map(async (file) => {
        const { path } = file;
        try {
          const result = await uploadFile(path);
          if (result && result.secure_url) {
            imageUrls.push(result.secure_url);
          }
          await fs.promises.unlink(path);
        } catch (error) {
          console.error('Error uploading file:', path, error);
        }
      }),
    );
  }

  // Update product fields
  product.productName = productName || product.productName;
  product.price = price || product.price;
  product.description = description || product.description;
  product.category = category ? category.toLowerCase() : product.category;
  product.countInStock = countInStock || product.countInStock;
  product.rating = rating || product.rating;
  product.discount = discount || product.discount;

  // Update product images if new ones were uploaded
  if (imageUrls.length > 0) {
    product.ProductImage = imageUrls;
  }

  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, 'Product updated successfully'));
});

//delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  await product.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, 'Product deleted successfully'));
});
//get product items by category
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.query;
  const searchCategory = category.toLowerCase();
  const products = await Product.find({ category: { $in: searchCategory } });
  if (!products) {
    throw new ApiError(404, 'Products not found');
  }
  return res.status(200).json(new ApiResponse(200, { products }, 'Products'));
});
//wishlist
const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  const user = await User.findById(userId);
  const alreadyAdded = user.wishlist.find((id) => id.toString() === productId);
  if (alreadyAdded) {
    let user = await User.findByIdAndUpdate(
      userId,
      { $pull: { wishlist: productId } },
      { new: true },
    );
  } else {
    let user = await User.findByIdAndUpdate(
      userId,
      { $push: { wishlist: productId } },
      { new: true },
    );
  }
  return res.json(new ApiResponse(200));
});
//cart
const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  const user = await User.findById(userId);
  const alreadyAdded = user.cart.find((id) => id.toString() === productId);
  if (alreadyAdded) {
    let user = await User.findByIdAndUpdate(
      userId,
      { $inc: { [`cart.${productId}`]: quantity } },
      { new: true },
    );
  } else {
    let user = await User.findByIdAndUpdate(
      userId,
      { $push: { cart: { productId, quantity } } },
      { new: true },
    );
  }
});

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addToWishlist,
};
