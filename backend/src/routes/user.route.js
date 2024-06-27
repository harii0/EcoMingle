import { Router } from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} from '../controllers/user.controller.js';
import { verifyJwt } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', verifyJwt, logoutUser);
router.route('/refresh_token').post(refreshToken);

export default router;
