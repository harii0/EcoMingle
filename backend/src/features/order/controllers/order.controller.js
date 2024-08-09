import Order from '../models/order.model.js';
import Product from '../../product/models/product.model.js';
import stripe from 'stripe';
import asyncHandler from '../../../utils/asyncHandler.js';
import { reduceQuantity } from '../../../utils/feature.js';

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { pId, quantity, shippingAddress1, city, zip } = req.body;
    const userId = req.user.id;

    const product = await Product.findById(pId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const totalPrice = product.price * quantity;

    const order = new Order({
      userId,
      pId,
      shippingAddress1,
      city,
      zip,
      quantity,
      totalPrice,
      status: 'pending',
      paymentStatus,
    });

    const newOrder = await order.save();
    if (newOrder) {
      reduceQuantity(pId, quantity);
    }
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Process payment for an order
export const processPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100, // Stripe works with cents
      currency: 'usd',
      metadata: { orderId: order._id.toString() },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all orders for the authenticated user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).exec();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a specific order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).exec();
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
