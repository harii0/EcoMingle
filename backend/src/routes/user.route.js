import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
  updateUser,
  forgotPassword,
  resetPassword,
} from '../controllers/user.controller.js';
import { verifyJwt } from '../middleware/auth.middleware.js';
import { verifyResetToken } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJwt, logoutUser);
router.route('/refresh_token').post(refreshToken);
router.patch('/update', verifyJwt, updateUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', verifyResetToken, resetPassword);

export default router;
