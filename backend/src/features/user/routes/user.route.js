import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  updateUser,
  forgotPassword,
  resetPassword,
  getUserProfile,
  getUserWhislist,
  rateProduct,
} from '../controllers/user.controller.js';
import { verifyJwt } from '../../../middleware/auth.middleware.js';
import { verifyResetToken } from '../../../middleware/auth.middleware.js';
import { upload } from '../../../middleware/multer.middleware.js';
import {
  getProductById,
  getProductsByCategory,
  addToWishlist,
  addToCart,
  removeFromCart,
} from '../../product/controllers/product.controller.js';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyResetToken, resetPassword);
//protect routes
router.post('/refresh_token', refreshToken);
router.patch('/update', verifyJwt, upload.single('avatar'), updateUser);
router.post('/logout', verifyJwt, logoutUser);
router.get('/profile', verifyJwt, getUserProfile);
router.get('/wishlist', verifyJwt, getUserWhislist);
router.post('/orders/ratings/:pId', verifyJwt, rateProduct);

//products
router.get('/products/:id', getProductById);
router.get('/category', verifyJwt, getProductsByCategory);
router.put('/wishlist', verifyJwt, addToWishlist);
router.get('/cart', verifyJwt);
router.put('/cart', verifyJwt, addToCart);
router.delete('/cart', verifyJwt, removeFromCart);

export default router;
