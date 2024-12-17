import { Router } from 'express';
import {
  verifyJwt,
  isAdmin,
  isVendor,
} from '../../../middleware/auth.middleware.js';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addToWishlist,
  addToCart,
  removeFromCart,
} from '../../product/controllers/product.controller.js';
import {
  createProductItem,
  deleteProductItem,
  updateProductItem,
} from '../../product/controllers/productItem.controller.js';
//vendor
import {
  createVendor,
  vendorLogin,
  getVendor,
  updateVendor,
  deleteVendor,
  getVendorProducts,
} from '../controllers/vendor.controller.js';

import { uploadFile } from '../../../middleware/uploadFile.js';
import { upload } from '../../../middleware/multer.middleware.js';
const router = Router();

router.post('/register', uploadFile.single('file'), createVendor);
router.post('/login', vendorLogin);
//profile
router.get('/profile/:vId', verifyJwt, getVendor);
router.patch('/profile/:vId', verifyJwt, isVendor, updateVendor);
router.delete('/profile/:vId', verifyJwt, isVendor, deleteVendor);

// /api/vendors/:vendorId/products

//product Management
router.post(
  '/add-product',
  verifyJwt,
  isVendor,
  upload.array('ProductImage', 3),
  createProduct,
);

router.patch(
  '/products/:pId',
  verifyJwt,
  isVendor,
  upload.array('ProductImage', 3),
  updateProduct,
);

router.delete('/products/:pId', verifyJwt, isVendor, deleteProduct);

//product items
router.post('/create-item', verifyJwt, isVendor, createProductItem);
router.get('/products/:vId', verifyJwt, isVendor, getVendorProducts);
router.patch('/update-item/:pId', verifyJwt, isVendor, updateProductItem);
router.delete('/delete-item/:pId', verifyJwt, isVendor, deleteProductItem);

export default router;
