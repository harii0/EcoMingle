import { Router } from 'express';

import {
  createOrder,
  getOrderById,
  getUserOrders,
  processPayment,
} from './controllers/order.controller.js';

const router = Router();

router.post('/', createOrder);
router.get('/:orderId', getOrderById);
router.get('/user/:userId', getUserOrders);
router.post('/process-payment', processPayment);

export default router;
