import express from 'express';
import cors from 'cors';
import { ApiError } from './utils/ApiError.js';
import userRoute from './routes/user.route.js';
import productRoute from './routes/product.route.js';
import cookieParser from 'cookie-parser';
const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser());
//routes
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
//error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(400).json({ message: 'Something went wrong' });
  }
});

export default app;
