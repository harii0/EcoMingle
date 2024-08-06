import { Router } from 'express';
import { verifyJwt, isAdmin, isVendor } from '../middleware/auth.middleware.js';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addToWishlist,
  addToCart,
  removeFromCart,
} from '../controllers/product.controller.js';
import {
  createProductItem,
  deleteProductItem,
  updateProductItem,
} from '../controllers/productItem.controller.js';
//vendor
import {
  createVendor,
  vendorLogin,
  getVendor,
  updateVendor,
  deleteVendor,
} from '../controllers/vendor.controller.js';

import { uploadFile } from '../middleware/uploadFile.js';
import { upload } from '../middleware/multer.middleware.js';
const router = Router();

router.post('/register', uploadFile.single('file'), createVendor);
router.post('/login', vendorLogin);
//profile
router.get('/profile/:vId', getVendor);
router.patch('/profile/:vId', verifyJwt, isVendor, updateVendor);
router.delete('/profile/:vId', verifyJwt, isVendor, deleteVendor);

// /api/vendors/:vendorId/products

//product Management
router.post(
  '/:vId/products',
  verifyJwt,
  isVendor,
  upload.array('ProductImage', 3),
  createProduct,
);

router.patch(
  '/:vId/products/:pId',
  verifyJwt,
  isVendor,
  upload.array('ProductImage', 3),
  updateProduct,
);

router.delete('/:vId/products/:pId', verifyJwt, isVendor, deleteProduct);

router.get('/:vId/products', verifyJwt, isVendor, getAllProducts);

//product items
router.post('/create-item', verifyJwt, isVendor, createProductItem); //not admin its vendor
router.patch('/update-item/:pId', verifyJwt, isVendor, updateProductItem);
router.delete('/delete-item/:pId', verifyJwt, isVendor, deleteProductItem);

export default router;
