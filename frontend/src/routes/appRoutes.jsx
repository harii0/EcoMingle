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
import Wishlist from '../features/user/pages/Wishlist';
import AdminDashboard from '../features/admin/pages/AdminDashboard';
import Users from '../features/admin/pages/Users';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<ProtectedRoute element={NotFound} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRoles={['user', 'admin']} element={Profile} />
        }
      />
      <Route
        path="/wishlist"
        element={<ProtectedRoute requiredRoles={['user']} element={Wishlist} />}
      />
      <Route
        path="/cart/checkout"
        element={<ProtectedRoute requiredRoles={['user']} element={Checkout} />}
      />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/cart" element={<Cart />} />

      {/* Admin Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute requiredRoles={['admin']} element={AdminDashboard} />
        }
      />
      <Route
        path="/users"
        element={<ProtectedRoute requiredRoles={['admin']} element={Users} />}
      />
    </Routes>
  );
};

export default AppRoutes;
