import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../features/user/pages/Home';
import Login from '../features/auth/pages/Login';
import ForgetPassword from '../features/auth/pages/ForgetPassword';
import ResetPassword from '../features/auth/pages/ResetPassword';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/user/pages/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import Profile from '../features/user/pages/Profile';
import NotFound from '../components/NotFound';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={Dashboard} />}
        />
        <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
