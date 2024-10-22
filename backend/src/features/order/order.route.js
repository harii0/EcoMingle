import { Router } from 'express';
import { verifyJwt } from '../../middleware/auth.middleware.js';
import {
  createOrder,
  cancelOrder,
  getOrderById,
  getUserOrders,
  processPayment,
  confirmPayment,
  // placeOrder,
  // getOrderHistory,
  // getOrderItems,
  // getOrderStatuses,
  // updateOrderStatus,
} from './controllers/order.controller.js';

const router = Router();

router.get('/my_orders', verifyJwt, getUserOrders);
router.post('/', verifyJwt, createOrder);
router.delete('/:orderId', cancelOrder);
router.get('/:orderId', getOrderById);
router.post('/process-payment', processPayment);
router.post('/confirm-payment', verifyJwt, confirmPayment);

export default router;
