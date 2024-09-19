import { Routes, Route } from 'react-router-dom';

import Login from '../features/auth/pages/Login';
import ForgetPassword from '../features/auth/pages/ForgetPassword';
import ResetPassword from '../features/auth/pages/ResetPassword';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/user/pages/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import Profile from '../features/user/pages/Profile';
import NotFound from '../components/NotFound';
import Catalog from '../features/user/pages/Catalog';
import ProductPage from '../features/user/pages/Product';
import Cart from '../features/user/pages/Cart';
import Checkout from '../features/user/pages/Checkout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<ProtectedRoute element={NotFound} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
      <Route path="/cart/checkout" element={<Checkout />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRoutes;
