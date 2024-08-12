import Stripe from 'stripe';
import 'dotenv/config';
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import Order from '../order/models/order.model.js';

const handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const orderId = paymentIntent.metadata.orderId;
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'paid';
        await order.save();
      }
      break;
    // Handle other event types as needed
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
};

export default handleStripeWebhook;
