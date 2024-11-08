import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/product/productSlice';
import cartReducer from '../features/user/cartSlice';
import adminReducer from '../features/admin/adminSlice';
const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    product: productReducer.reducer,
    cart: cartReducer.reducer,
    admin: adminReducer.reducer,
  },
});

export default store;
