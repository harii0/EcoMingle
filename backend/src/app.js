import express from 'express';
import cors from 'cors';
import { ApiError } from './utils/apiError';

const app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//error handler
app.use((err, req, res, next) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: 'Internal server error' })
  }
})
//routes



export default app;
