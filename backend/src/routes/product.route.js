import { Router } from 'express';
import { verifyJwt, isAdmin } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
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
const router = Router();

router.get('/all-products', getAllProducts);

router.post(
  '/new-product',
  verifyJwt,
  isAdmin,
  upload.array('ProductImage', 3),
  createProduct,
);
router.patch(
  '/update-product/:id',
  verifyJwt,
  isAdmin,
  upload.array('ProductImage', 3),
  updateProduct,
);
router.delete('/delete-product/:id', verifyJwt, isAdmin, deleteProduct);
router.get('/category', verifyJwt, getProductsByCategory);
router.put('/wishlist', verifyJwt, addToWishlist);
router.put('/add-item', verifyJwt, addToCart);
router.delete('/remove-item', verifyJwt, removeFromCart);

//product items
router.post('/create-item', verifyJwt, isAdmin, createProductItem); //not admin its vendor
router.patch('/update-item/:id', verifyJwt, isAdmin, updateProductItem);
router.delete('/delete-item/:id', verifyJwt, isAdmin, deleteProductItem);

export default router;
