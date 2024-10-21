import 'dotenv/config';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import Product from '../../product/models/product.model.js';
import asyncHandler from '../../../utils/asyncHandler.js';
import { reduceQuantity, increaseQuantity } from '../../../utils/feature.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getUserOrders = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const orders = await Order.find({ user: userId })
      .populate('product', 'productName ProductImage')
      .lean();

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get a specific order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    const productDetails = await Product.findById(order.product);
    const orderDetails = { ...order._doc, productDetails };
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.status(200).json(orderDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createOrder = asyncHandler(async (req, res) => {
  try {
    const { pId, quantity, shippingAddress1, city, zip, country, phone } =
      req.body;
    const userId = req.user.id;

    const product = await Product.findById(pId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const totalPrice = product.price * quantity;

    const order = new Order({
      user: userId,
      product: pId,
      shippingAddress1,
      city,
      zip,
      quantity,
      totalPrice,
      status: 'pending',
      phone,
      country,
    });

    const newOrder = await order.save();
    if (newOrder) {
      reduceQuantity(pId, quantity);
    }
    res.status(201).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Server error', error });
  }
});

// Process payment for an order
export const processPayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentMethod, currency } = req.body;
    console.log(
      '#####################################',
      paymentMethod,
      currency,
    );

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    //  a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100,
      currency: currency || 'usd',
      payment_method: paymentMethod,
      metadata: { orderId: order._id.toString() },
      confirm: true,
      payment_method_types: ['card'],
      automatic_payment_methods: {
        allow_redirects: 'never',
        enabled: true,
      },
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

export const confirmPayment = asyncHandler(async (req, res) => {
  try {
    const { paymentIntentId, orderId, paymentMethod } = req.body;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Retrieve the Payment Intent to confirm its status

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const payment = await stripe.paymentIntents.confirm(paymentIntent.id, {
      payment_method: paymentMethod,
    });
    if (payment.status === 'succeeded') {
      order.paymentStatus = 'paid';
      order.status = 'processing';
      await order.save();

      res.status(200).json({ message: 'Payment confirmed and order updated' });
    } else {
      res
        .status(400)
        .json({ message: 'Payment not successful. Please try again.' });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: 'Server error', error });
  }
});

export const cancelOrder = asyncHandler(async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Check if order is already paid
    if (order.paymentStatus === 'paid') {
      // Refund payment
      await stripe.refunds.create({
        payment_intent: order.paymentIntentId, // The ID of the payment intent
        amount: order.totalPrice * 100, // amount in cents
        reason: 'requested_by_customer',
      });
    }
    //restock the product
    increaseQuantity(order.product, order.quantity);
    // Update order status
    order.status = 'cancelled';
    order.paymentStatus = 'refunded';
    // or 'cancelled' depending on your logic
    await order.save();

    res.status(200).json({ message: 'Order cancelled and refunded' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});
