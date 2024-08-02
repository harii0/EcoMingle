import { Router } from 'express';
import { verifyJwt, isAdmin, isVendor } from '../middleware/auth.middleware.js';
import {
  createVendor,
  vendorLogin,
  getVendor,
  updateVendor,
  deleteVendor,
} from '../controllers/vendor.controller.js';

import { uploadFile } from '../middleware/uploadFile.js';
const router = Router();

router.post('/register', uploadFile.single('file'), createVendor);
router.post('/login', vendorLogin);
// / api / vendors//admin

router.get('/vendor/:vId', getVendor);
router.patch('/update-vendor/:vId', verifyJwt, isVendor, updateVendor);
router.delete('/delete-vendor/:vId', verifyJwt, isVendor, deleteVendor);

// /api/vendors/:vendorId/products

export default router;
