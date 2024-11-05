import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/user/cartSlice';
import paymentReducer from '../features/user/paymentSlice';
const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    product: productReducer.reducer,
    cart: cartReducer.reducer,
    payment: paymentReducer,
  },
});

export default store;
