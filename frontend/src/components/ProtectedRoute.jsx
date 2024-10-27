/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, requiredRole, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && requiredRole && user.role == requiredRole) {
      // Redirect based on user role
      if (user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard'); // Generic user dashboard
      }
    }
  }, [isAuthenticated, user, navigate, requiredRole]);

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (requiredRole && user?.data.user.role != requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
