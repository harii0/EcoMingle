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
import { verifyJwt } from '../middleware/auth.middleware.js';
import { verifyResetToken } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyResetToken, resetPassword);
//protect routes
router.route('/refresh_token').post(refreshToken);
router.patch('/update', verifyJwt, upload.single('avatar'), updateUser);
router.post('/logout', verifyJwt, logoutUser);
router.get('/profile', verifyJwt, getUserProfile);
router.get('/wishlist', verifyJwt, getUserWhislist);
router.post('/ratings/:prodId', verifyJwt, rateProduct);
export default router;
