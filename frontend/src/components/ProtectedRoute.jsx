/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, requiredRoles, ...rest }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Get user role from state
  const role = user?.data?.user?.role || user?.user.role;

  // If role does not match requiredRole, redirect based on role
  if (requiredRoles && !requiredRoles.includes(role)) {
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'vendor') return <Navigate to="/vendor" replace />;
    return <Navigate to="/dashboard" replace />; // Generic user dashboard
  }

  // If all checks pass, render the component
  return <Component {...rest} />;
};

export default ProtectedRoute;
