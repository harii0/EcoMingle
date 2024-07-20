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
} from '../controllers/product.controller.js';
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

export default router;
