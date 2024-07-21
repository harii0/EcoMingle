import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import uploadFile from '../utils/cloudinary.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import Cart from '../models/cart.model.js';

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
  const product = await Product.findById(id).populate('productItem');
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return res.status(200).json(new ApiResponse(200, { product }, 'Product'));
});

const createProduct = asyncHandler(async (req, res) => {
  const { productName, price, description, category } = req.body;

  const imageUrls = [];
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
  const { productName, price, description, category } = req.body;

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
  // Update product images if new ones were uploaded
  if (imageUrls.length > 0) {
    product.ProductImage = imageUrls;
  }

  await product.save();
  const updatedProduct = await Product.findById(id).populate('productItem');
  return res
    .status(200)
    .json(
      new ApiResponse(200, { updatedProduct }, 'Product updated successfully'),
    );
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
  const { productId } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  const user = await User.findById(userId);
  console.log(user);
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    const alreadyAdded = user.cart.find(
      (item) => item.productId.toString() === productId,
    );
    if (alreadyAdded) {
      alreadyAdded.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }
  await cart.save();
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { cart: cart._id },
    { new: true },
  ).populate('cart');
  return res.json(
    new ApiResponse(200, { updatedUser }, 'Product added to cart'),
  );
});
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;
  //find the cart
  let cart = Cart.findOne({ userId });
  if (cart) {
    cart.items = cart.items.filter(
      (item) => item.productId.toString() != productId,
    );
  }
  const user = await User.findById(userId).populate('cart');
  //return the populated object
  return res.json(new ApiResponse(200, { user }, 'removed from cart'));
});

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addToWishlist,
  addToCart,
  removeFromCart,
};
