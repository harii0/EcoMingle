import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../features/user/pages/Home';
import Login from '../features/auth/Login';
import ForgetPassword from '../features/auth/ForgetPassword';
import ResetPassword from '../features/auth/ResetPassword';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
