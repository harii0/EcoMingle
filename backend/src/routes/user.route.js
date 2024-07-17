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
//get profile not working
router.get('/profile', verifyJwt, getUserProfile);

export default router;
