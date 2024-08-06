import express from 'express';
import cors from 'cors';
import { ApiError } from './utils/ApiError.js';
import userRoute from './routes/user.route.js';
import vendorRoute from './routes/vendor.route.js';
import adminRoute from './routes/admin.route.js';
import orderRoute from './routes/order.route.js';
// import handleStripeWebhook from './controllers/webhook.controller.js';
import cookieParser from 'cookie-parser';
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
//routes
app.use('/api/admin', adminRoute);
app.use('/api/user', userRoute);
app.use('/api/vendor', vendorRoute);
app.use('/api/order', orderRoute);

// app.use('/webhook', handleStripeWebhook);

//error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

export default app;
